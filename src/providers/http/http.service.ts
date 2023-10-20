import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface ResponseEcuadorLegal {
  contribuyente: Contribuyente;
  deuda: any;
  impugnacion: any;
  remision: any;
}

export interface Contribuyente {
  identificacion: string;
  denominacion: any;
  tipo: any;
  clase: string;
  tipoIdentificacion: string;
  resolucion: any;
  nombreComercial: string;
  direccionMatriz: any;
  fechaInformacion: number;
  mensaje: any;
  estado: any;
}

@Injectable()
export class HttpCustomService {
  constructor(private readonly httpService: HttpService) {}

  public async requestSRI(cedula: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get<ResponseEcuadorLegal>(
          `https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/${cedula}/?tipoPersona=N&_=1681311929298`,
        ),
      );
      if (response.data) {
        return response.data.contribuyente;
      }
      return undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
