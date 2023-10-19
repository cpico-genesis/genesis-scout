import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CedulaScheduleService {
  private readonly logger = new Logger(CedulaScheduleService.name);

  requestEcuadorLegal() {
    this.logger.log('requestEcuadorLegal');
  }
}
