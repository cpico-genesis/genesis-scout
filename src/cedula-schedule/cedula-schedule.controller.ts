import { Controller } from '@nestjs/common';
import { CedulaScheduleService } from './cedula-schedule.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SybaseController } from 'src/sybase/sybase.controller';

@Controller()
export class CedulaScheduleController {
  constructor(
    private readonly cedulaScheduleService: CedulaScheduleService,
    private readonly sybaseController: SybaseController,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const res = await this.sybaseController.obtenerCedulaSybase();
    console.log(res);
  }
}
