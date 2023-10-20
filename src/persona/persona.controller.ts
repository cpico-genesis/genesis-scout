import { Controller, Delete, Get, Param } from '@nestjs/common';
import { PersonaService } from './persona.service';

@Controller('persona')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Get()
  findAll() {
    return this.personaService.findAll();
  }

  @Get(':identificacion')
  findOne(@Param('identificacion') identificacion: string) {
    return this.personaService.findIdentificacion(identificacion);
  }
}
