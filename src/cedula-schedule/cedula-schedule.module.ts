import { Module } from '@nestjs/common';
import { CedulaScheduleService } from './cedula-schedule.service';
import { CedulaScheduleController } from './cedula-schedule.controller';
import { SybaseModule } from 'src/sybase/sybase.module';
import { SybaseController } from 'src/sybase/sybase.controller';

@Module({
  imports: [SybaseModule],
  controllers: [CedulaScheduleController],
  providers: [CedulaScheduleService, SybaseController],
})
export class CedulaScheduleModule {}
