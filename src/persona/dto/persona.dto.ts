import { IsString, IsOptional } from 'class-validator';

export class personaCreateDTO {
  @IsString()
  readonly nombre: string;

  @IsString()
  @IsOptional()
  readonly tipoIdentificacion?: string;

  @IsString()
  @IsOptional()
  readonly direccionMatriz?: string;

  @IsString()
  @IsOptional()
  readonly cedula_ruc?: string;

  @IsString()
  @IsOptional()
  readonly denominacion?: string;

  @IsString()
  @IsOptional()
  readonly estado?: string;
}
