import { Controller } from '@nestjs/common';
import { SybaseService } from './sybase.service';

@Controller('sybase')
export class SybaseController {
  constructor(private readonly sybaseService: SybaseService) {}

  obtenerCedulaSybase() {
    this.sybaseService.query(`SELECT cedula_ruc FROM in_cliente WHERE (LENGTH(cedula_ruc) = 10 OR LENGTH(cedula_ruc) = 13) AND cedula_ruc <> '9999999999999'`);
  }
}
