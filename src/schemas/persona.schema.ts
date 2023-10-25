import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonaDocument = HydratedDocument<Personas>;

@Schema({
  timestamps: true,
})
export class Personas {
  @Prop({
    required: true,
    trim: true,
  })
  nombre: string;

  @Prop({
    trim: true,
  })
  tipoIdentificacion?: string;

  @Prop({
    trim: true,
  })
  direccionMatriz?: string;

  @Prop({
    trim: true,
    required: true,
  })
  cedula_ruc?: string;

  @Prop({
    trim: true,
  })
  denominacion?: string;

  @Prop({
    trim: true,
  })
  estado?: string;
}

export const PersonaSchema = SchemaFactory.createForClass(Personas);
