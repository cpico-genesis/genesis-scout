import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Historial } from '../schemas/historial.schema';
import { HistorialCreateDTO } from './dto/historial.dto';

@Injectable()
export class HistorialService {
  constructor(
    @InjectModel(Historial.name) private historialModel: Model<Historial>,
  ) {}

  create(createHistorialDto: HistorialCreateDTO) {
    const createdHistorial = new this.historialModel(createHistorialDto);
    return createdHistorial.save();
  }

  findAll() {
    return this.historialModel.find().exec();
  }

  findOne(id: string) {
    return this.historialModel.findById(id).exec();
  }
}
