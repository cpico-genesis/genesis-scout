import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Persona } from '../schemas/persona.schema';
import { personaCreateDTO } from './dto/persona.dto';

@Injectable()
export class PersonaService {
  constructor(
    @InjectModel(Persona.name) private personaModel: Model<Persona>,
  ) {}

  async create(createPersonaDto: personaCreateDTO): Promise<Persona> {
    const createdPersona = new this.personaModel(createPersonaDto);
    return createdPersona.save();
  }

  async findAll(): Promise<Persona[]> {
    return this.personaModel.find().exec();
  }
}
