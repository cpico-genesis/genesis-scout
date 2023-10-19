import { IsString, IsOptional } from 'class-validator';

export class personaCreateDTO {

  @IsString()
  readonly nombre: string;

  @IsString()
  @IsOptional()
  readonly tipoIdentificacion?: number;

  @IsString()
  @IsOptional()
  readonly direccionMatriz?: string;

  @IsString()
  @IsOptional()
  readonly identificacion?: string;

  @IsString()
  @IsOptional()
  readonly denominacion?: string;

  @IsString()
  @IsOptional()
  readonly estado?: string;
}
