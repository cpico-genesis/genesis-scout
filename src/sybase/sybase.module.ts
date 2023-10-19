import { Module } from '@nestjs/common';
import { SybaseService } from './sybase.service';
import { SybaseController } from './sybase.controller';

@Module({
  controllers: [SybaseController],
  providers: [SybaseService],
  exports: [SybaseService],
})
export class SybaseModule {}
