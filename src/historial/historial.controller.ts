import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistorialService } from './historial.service';
import { HistorialCreateDTO } from './dto/historial.dto';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post()
  create(@Body() createHistorialDto: HistorialCreateDTO) {
    return this.historialService.create(createHistorialDto);
  }

  @Get()
  findAll() {
    return this.historialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialService.findOne(id);
  }
}
