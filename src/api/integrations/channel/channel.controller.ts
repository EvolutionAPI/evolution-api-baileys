import { ProviderFiles } from '@api/provider/sessions';
import { PrismaRepository } from '@api/repository/repository.service';
import { CacheService } from '@api/services/cache.service';
import { WAMonitoringService } from '@api/services/monitor.service';
import { ConfigService } from '@config/env.config';
import EventEmitter2 from 'eventemitter2';

import { BaileysStartupService } from './whatsapp/whatsapp.baileys.service';

type ChannelDataType = {
  configService: ConfigService;
  eventEmitter: EventEmitter2;
  prismaRepository: PrismaRepository;
  cache: CacheService;
  baileysCache: CacheService;
  providerFiles: ProviderFiles;
};

export interface ChannelControllerInterface {
  receiveWebhook(data: any): Promise<any>;
}

export class ChannelController {
  public prismaRepository: PrismaRepository;
  public waMonitor: WAMonitoringService;

  constructor(prismaRepository: PrismaRepository, waMonitor: WAMonitoringService) {
    this.prisma = prismaRepository;
    this.monitor = waMonitor;
  }

  public set prisma(prisma: PrismaRepository) {
    this.prismaRepository = prisma;
  }

  public get prisma() {
    return this.prismaRepository;
  }

  public set monitor(waMonitor: WAMonitoringService) {
    this.waMonitor = waMonitor;
  }

  public get monitor() {
    return this.waMonitor;
  }

  public init(data: ChannelDataType) {
    return new BaileysStartupService(
      data.configService,
      data.eventEmitter,
      data.prismaRepository,
      data.cache,
      data.baileysCache,
      data.providerFiles,
    );
  }
}
