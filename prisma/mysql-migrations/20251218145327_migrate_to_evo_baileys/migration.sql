/*
  Warnings:

  - You are about to drop the column `chatwootContactInboxSourceId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `chatwootConversationId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `chatwootInboxId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `chatwootIsRead` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `chatwootMessageId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Chatwoot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dify` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DifySetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evoai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvoaiSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvolutionBot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EvolutionBotSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Flowise` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FlowiseSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IntegrationSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `N8n` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `N8nSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenaiBot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenaiCreds` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OpenaiSetting` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Typebot` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypebotSetting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Chatwoot` DROP FOREIGN KEY `Chatwoot_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `Dify` DROP FOREIGN KEY `Dify_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `DifySetting` DROP FOREIGN KEY `DifySetting_difyIdFallback_fkey`;

-- DropForeignKey
ALTER TABLE `DifySetting` DROP FOREIGN KEY `DifySetting_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `Evoai` DROP FOREIGN KEY `Evoai_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `EvoaiSetting` DROP FOREIGN KEY `EvoaiSetting_evoaiIdFallback_fkey`;

-- DropForeignKey
ALTER TABLE `EvoaiSetting` DROP FOREIGN KEY `EvoaiSetting_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `EvolutionBot` DROP FOREIGN KEY `EvolutionBot_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `EvolutionBotSetting` DROP FOREIGN KEY `EvolutionBotSetting_botIdFallback_fkey`;

-- DropForeignKey
ALTER TABLE `EvolutionBotSetting` DROP FOREIGN KEY `EvolutionBotSetting_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `Flowise` DROP FOREIGN KEY `Flowise_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `FlowiseSetting` DROP FOREIGN KEY `FlowiseSetting_flowiseIdFallback_fkey`;

-- DropForeignKey
ALTER TABLE `FlowiseSetting` DROP FOREIGN KEY `FlowiseSetting_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `IntegrationSession` DROP FOREIGN KEY `IntegrationSession_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `N8n` DROP FOREIGN KEY `N8n_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `N8nSetting` DROP FOREIGN KEY `N8nSetting_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `N8nSetting` DROP FOREIGN KEY `N8nSetting_n8nIdFallback_fkey`;

-- DropForeignKey
ALTER TABLE `OpenaiBot` DROP FOREIGN KEY `OpenaiBot_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `OpenaiBot` DROP FOREIGN KEY `OpenaiBot_openaiCredsId_fkey`;

-- DropForeignKey
ALTER TABLE `OpenaiCreds` DROP FOREIGN KEY `OpenaiCreds_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `OpenaiSetting` DROP FOREIGN KEY `OpenaiSetting_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `OpenaiSetting` DROP FOREIGN KEY `OpenaiSetting_openaiCredsId_fkey`;

-- DropForeignKey
ALTER TABLE `OpenaiSetting` DROP FOREIGN KEY `OpenaiSetting_openaiIdFallback_fkey`;

-- DropForeignKey
ALTER TABLE `Template` DROP FOREIGN KEY `Template_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `Typebot` DROP FOREIGN KEY `Typebot_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `TypebotSetting` DROP FOREIGN KEY `TypebotSetting_instanceId_fkey`;

-- DropForeignKey
ALTER TABLE `TypebotSetting` DROP FOREIGN KEY `TypebotSetting_typebotIdFallback_fkey`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `chatwootContactInboxSourceId`,
    DROP COLUMN `chatwootConversationId`,
    DROP COLUMN `chatwootInboxId`,
    DROP COLUMN `chatwootIsRead`,
    DROP COLUMN `chatwootMessageId`,
    DROP COLUMN `sessionId`;

-- DropTable
DROP TABLE `Chatwoot`;

-- DropTable
DROP TABLE `Dify`;

-- DropTable
DROP TABLE `DifySetting`;

-- DropTable
DROP TABLE `Evoai`;

-- DropTable
DROP TABLE `EvoaiSetting`;

-- DropTable
DROP TABLE `EvolutionBot`;

-- DropTable
DROP TABLE `EvolutionBotSetting`;

-- DropTable
DROP TABLE `Flowise`;

-- DropTable
DROP TABLE `FlowiseSetting`;

-- DropTable
DROP TABLE `IntegrationSession`;

-- DropTable
DROP TABLE `N8n`;

-- DropTable
DROP TABLE `N8nSetting`;

-- DropTable
DROP TABLE `OpenaiBot`;

-- DropTable
DROP TABLE `OpenaiCreds`;

-- DropTable
DROP TABLE `OpenaiSetting`;

-- DropTable
DROP TABLE `Template`;

-- DropTable
DROP TABLE `Typebot`;

-- DropTable
DROP TABLE `TypebotSetting`;

