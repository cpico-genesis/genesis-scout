import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Personas } from '../schemas/persona.schema';
import { personaCreateDTO } from './dto/persona.dto';

@Injectable()
export class PersonaService {
  constructor(
    @InjectModel(Personas.name) private personaModel: Model<Personas>,
  ) {}

  async create(createPersonaDto: personaCreateDTO): Promise<Personas> {
    const createdPersona = new this.personaModel(createPersonaDto);
    return createdPersona.save();
  }

  async findAll(): Promise<Personas[]> {
    return this.personaModel.find().exec();
  }

  async findByParams(params: any): Promise<Personas> {
    return this.personaModel.findOne(params).exec();
  }

  async findIdentificacion(cedula_ruc: string): Promise<Personas> {
    return this.personaModel.findOne({ cedula_ruc }).exec();
  }

  async getTotal(): Promise<number> {
    return this.personaModel.countDocuments().exec();
  }
}
