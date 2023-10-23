import { Module } from '@nestjs/common';
import { CedulaScheduleService } from './cedula-schedule.service';
import { CedulaScheduleController } from './cedula-schedule.controller';
import { SybaseModule } from 'src/sybase/sybase.module';
import { SybaseController } from 'src/sybase/sybase.controller';
import { PersonaModule } from 'src/persona/persona.module';
import { ProvidersModule } from 'src/providers/providers.module';
import { HttpCustomService } from 'src/providers/http/http.service';
import { HistorialModule } from 'src/historial/historial.module';

@Module({
  imports: [SybaseModule, PersonaModule, ProvidersModule, HistorialModule],
  controllers: [CedulaScheduleController],
  providers: [CedulaScheduleService, SybaseController, HttpCustomService],
})
export class CedulaScheduleModule {}
