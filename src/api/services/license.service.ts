import { configService, PapiLicense } from '@config/env.config';
import { Logger } from '@config/logger.config';

import licenseManager from '../../../papi/lib/License/licenseManager.js';

export class LicenseService {
  private logger = new Logger('LICENSE');
  private initialized = false;
  private initializing = false;

  /**
   * Initialize license manager with environment variables (lazy initialization)
   * Only initializes when interactive messages are actually used
   */
  private async ensureInitialized(): Promise<void> {
    // Se já está inicializado, retorna
    if (this.initialized) {
      return;
    }

    // Se já está inicializando, aguarda
    if (this.initializing) {
      // Aguarda até 5 segundos para a inicialização completar
      let attempts = 0;
      while (this.initializing && attempts < 50) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        attempts++;
      }
      return;
    }

    this.initializing = true;

    try {
      const licenseConfig = configService.get<PapiLicense>('PAPI_LICENSE');

      // Se não há configuração de licença, bloqueia mensagens interativas
      if (!licenseConfig.KEY || !licenseConfig.ADMIN_URL) {
        this.logger.warn(
          '⚠️ PAPI License not configured - Interactive messages (buttons, lists, carousel) will be BLOCKED',
        );
        this.logger.warn(
          'To enable interactive messages, configure PAPI_LICENSE_KEY and PAPI_LICENSE_ADMIN_URL in your .env file',
        );
        this.logger.warn('Get your license key at: https://padmin.intrategica.com.br/register.html');
        this.initializing = false;
        return;
      }

      this.logger.verbose('Initializing PAPI License Manager...');

      await licenseManager.initialize(licenseConfig.KEY, licenseConfig.ADMIN_URL);

      // Set callback for when license is blocked
      licenseManager.onBlock(() => {
        this.logger.error('⚠️ PAPI License has been BLOCKED - Interactive messages are now disabled');
      });

      const initialStatus = licenseManager.getStatus();

      if (initialStatus.status === 'PENDING_ACTIVATION') {
        this.logger.warn(
          '⏳ PAPI License is pending activation - Interactive messages will be blocked until activation',
        );
      } else if (initialStatus.status === 'MACHINE_MISMATCH') {
        this.logger.error('❌ PAPI License is bound to another server - Interactive messages are disabled');
      } else if (initialStatus.status === 'ACTIVE') {
        this.logger.info(`✓ PAPI License is ACTIVE - Interactive messages enabled`);
      } else {
        this.logger.warn(`PAPI License status: ${initialStatus.status} - ${initialStatus.message}`);
      }

      this.initialized = true;
    } catch (error) {
      this.logger.error(`Failed to initialize PAPI License Manager: ${error}`);
      // Não bloqueia a inicialização, mas marca como não inicializado
    } finally {
      this.initializing = false;
    }
  }

  /**
   * Check if interactive messages are allowed (buttons, lists, carousel)
   * Initializes license manager on first use (lazy initialization)
   * Updates instance count when checking (replaces periodic updates)
   */
  public async isAllowed(instancesCount?: number): Promise<boolean> {
    const licenseConfig = configService.get<PapiLicense>('PAPI_LICENSE');

    // Se não há configuração de licença, bloqueia mensagens interativas
    if (!licenseConfig.KEY || !licenseConfig.ADMIN_URL) {
      return false;
    }

    // Inicializa se ainda não foi inicializado (lazy initialization)
    await this.ensureInitialized();

    // Se não foi inicializado após tentativa, bloqueia por segurança
    if (!this.initialized) {
      return false;
    }

    // Atualiza contagem de instâncias quando verificar (substitui atualização periódica)
    if (instancesCount !== undefined) {
      licenseManager.setInstancesCount(instancesCount);
    }

    return licenseManager.isAllowed();
  }

  /**
   * Get current license status
   * Initializes license manager on first use (lazy initialization)
   */
  public async getStatus() {
    const licenseConfig = configService.get<PapiLicense>('PAPI_LICENSE');

    if (!licenseConfig.KEY || !licenseConfig.ADMIN_URL) {
      return {
        isValid: false,
        status: 'NOT_CONFIGURED' as const,
        message: 'License key and admin URL must be configured',
      };
    }

    // Inicializa se ainda não foi inicializado (lazy initialization)
    await this.ensureInitialized();

    if (!this.initialized) {
      return {
        isValid: false,
        status: 'NOT_INITIALIZED' as const,
        message: 'License manager not initialized',
      };
    }

    return licenseManager.getStatus();
  }

  /**
   * Update instances count for heartbeat
   * Called only when interactive messages are used (not periodically)
   * @deprecated Use isAllowed(instancesCount) instead
   */
  public setInstancesCount(count: number): void {
    if (this.initialized) {
      licenseManager.setInstancesCount(count);
    }
  }
}

export const licenseService = new LicenseService();
