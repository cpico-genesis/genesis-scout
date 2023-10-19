import { Controller } from '@nestjs/common';
import { PersonaService } from './persona.service';

@Controller()
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}
}
