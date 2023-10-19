import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { SybaseModule } from './sybase/sybase.module';
import { MongooseModule } from './mongoose/mongoose.module';
import { CedulaScheduleModule } from './cedula-schedule/cedula-schedule.module';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [
    SybaseModule,
    MongooseModule,
    CedulaScheduleModule,
    PersonaModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
