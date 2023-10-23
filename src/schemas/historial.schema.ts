import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HistorialDocument = HydratedDocument<Historial>;

@Schema({
  timestamps: true,
})
export class Historial {
  @Prop({
    required: true,
    trim: true,
  })
  sybasedb: string;

  @Prop({
    trim: true,
  })
  tabla: string;

  @Prop({
    trim: true,
  })
  identificacion: string;

  @Prop({
    trim: true,
  })
  pendiente: boolean;

  @Prop({
    trim: true,
  })
  endPoint: string;

  @Prop({
    trim: true,
  })
  detalle: string;
}

export const HistorialSchema = SchemaFactory.createForClass(Historial);
