import { Controller } from '@nestjs/common';
import { SybaseService } from './sybase.service';

interface DataSybaseQuery {
  codigo: number;
  cedula_ruc: string;
}

@Controller('sybase')
export class SybaseController {
  constructor(private readonly sybaseService: SybaseService) {}

  async obtenerCedulaSybase() {
    const res = await this.sybaseService.query<DataSybaseQuery[] | undefined>(
      `SELECT top 1 codigo, cedula_ruc FROM in_cliente WHERE (LENGTH(cedula_ruc) = 10 OR LENGTH(cedula_ruc) = 13) AND cedula_ruc <> '9999999999999'`,
    );
    return res;
  }

  async eliminarCedulaSybase(codigo: number) {
    const res = await this.sybaseService.delete(
      `DELETE FROM in_cliente WHERE codigo = ${codigo}`,
    );
    return res;
  }
}
