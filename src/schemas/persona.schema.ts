import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PersonaDocument = HydratedDocument<Persona>;

@Schema({
  timestamps: true,
})
export class Persona {
  @Prop({
    required: true,
    trim: true,
  })
  nombre: string;

  @Prop({
    trim: true,
  })
  tipoIdentificacion?: number;

  @Prop({
    trim: true,
  })
  direccionMatriz?: string;

  @Prop({
    trim: true,
    required: true,
  })
  identificacion?: string;

  @Prop({
    trim: true,
  })
  denominacion?: string;

  @Prop({
    trim: true,
  })
  estado?: string;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);
