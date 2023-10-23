import { IsString, IsOptional } from 'class-validator';

export class HistorialCreateDTO {
  @IsString()
  readonly sybasedb: string;

  @IsString()
  readonly tabla: string;

  @IsString()
  readonly identificacion: string;

  @IsString()
  readonly pendiente: boolean;

  @IsString()
  readonly endPoint: string;

  @IsString()
  @IsOptional()
  readonly detalle: string;
}
