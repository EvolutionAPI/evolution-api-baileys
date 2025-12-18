import { Router } from 'express';

import { BaileysRouter } from './whatsapp/baileys.router';

export class ChannelRouter {
  public readonly router: Router;

  constructor(configService: any, ...guards: any[]) {
    this.router = Router();

    this.router.use('/baileys', new BaileysRouter(...guards).router);
  }
}
