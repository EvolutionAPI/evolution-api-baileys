const dotenv = require('dotenv');
const { execSync } = require('child_process');
const { existsSync } = require('fs');

dotenv.config();

const { DATABASE_PROVIDER } = process.env;
const databaseProviderDefault = DATABASE_PROVIDER ?? 'postgresql';
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Error: Migration name is required');
  console.log('Usage: node createMigration.js <migration_name>');
  process.exit(1);
}

if (!DATABASE_PROVIDER) {
  console.warn(`DATABASE_PROVIDER is not set in the .env file, using default: ${databaseProviderDefault}`);
}

function getMigrationsFolder(provider) {
  switch (provider) {
    case 'psql_bouncer':
      return 'postgresql-migrations';
    default:
      return `${provider}-migrations`;
  }
}

const migrationsFolder = getMigrationsFolder(databaseProviderDefault);
const schemaFile = `./prisma/${databaseProviderDefault}-schema.prisma`;

console.log(`Creating migration: ${migrationName}`);
console.log(`Database provider: ${databaseProviderDefault}`);
console.log(`Migrations folder: ${migrationsFolder}`);

try {
  // Copiar migrations existentes
  execSync(`rm -rf ./prisma/migrations`, { stdio: 'inherit' });
  execSync(`cp -r ./prisma/${migrationsFolder} ./prisma/migrations`, { stdio: 'inherit' });
  
  // Verificar status das migrações primeiro
  console.log('\n📋 Checking migration status...');
  try {
    const statusOutput = execSync(`npx prisma migrate status --schema ${schemaFile}`, { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log(statusOutput);
  } catch (statusError) {
    const errorOutput = statusError.stdout?.toString() || statusError.stderr?.toString() || '';
    if (errorOutput.includes('was modified after it was applied')) {
      console.log('\n⚠️  Detected modified migration. Attempting to resolve...');
      console.log('💡 If this fails, you may need to run: npx prisma migrate reset --schema ' + schemaFile);
      console.log('   (WARNING: This will drop all data in the database)\n');
    }
  }
  
  // Criar nova migração
  console.log(`\n🚀 Creating migration: ${migrationName}`);
  execSync(`npx prisma migrate dev --name ${migrationName} --schema ${schemaFile}`, { stdio: 'inherit' });
  
  // Copiar nova migração de volta
  execSync(`cp -r ./prisma/migrations/* ./prisma/${migrationsFolder}`, { stdio: 'inherit' });
  
  console.log(`\n✅ Migration "${migrationName}" created successfully!`);
} catch (error) {
  const errorOutput = error.stdout?.toString() || error.stderr?.toString() || error.message;
  if (errorOutput.includes('was modified after it was applied')) {
    console.error(`\n❌ Migration conflict detected!`);
    console.error(`\n📝 To resolve this, you have two options:\n`);
    console.error(`   1. Reset the database (WARNING: Drops all data):`);
    console.error(`      npx prisma migrate reset --schema ${schemaFile}\n`);
    console.error(`   2. Mark the migration as resolved (if you know what you're doing):`);
    console.error(`      npx prisma migrate resolve --applied 20250918182355_add_kafka_integration --schema ${schemaFile}\n`);
  } else {
    console.error(`\n❌ Error creating migration: ${errorOutput}`);
  }
  process.exit(1);
}

