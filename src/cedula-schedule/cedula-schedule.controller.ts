import { Controller, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SybaseController } from 'src/sybase/sybase.controller';
import { PersonaService } from 'src/persona/persona.service';
import { HttpCustomService } from 'src/providers/http/http.service';
import { HistorialService } from 'src/historial/historial.service';

export type table = 'in_cliente' | 'in_proveedor';
interface registrarHistorial {
  endPoint: string;
  identificacion: string;
  pendiente: boolean;
  tabla: string;
  detalle: string;
}

@Controller()
export class CedulaScheduleController {
  private readonly logger = new Logger(CedulaScheduleController.name);

  constructor(
    private readonly sybaseController: SybaseController,
    private readonly personaService: PersonaService,
    private readonly httpService: HttpCustomService,
    private readonly historialService: HistorialService,
  ) {}

  async procesarIngreso(tabla: table) {
    try {
      const data = await this.sybaseController.obtenerCedulaSybase(tabla);

      if (data && data.length) {
        const persona = await this.personaService.findByParams({
          cedula: data[0].cedula_ruc,
        });

        // si no existe la persona en la base de datos de mongo
        if (!persona) {
          console.log(
            'Consultando ... ' + data[0].cedula_ruc + ' .. ' + data[0].codigo,
          );
          const responseSRI = await this.requestSRI(
            data[0].cedula_ruc,
            data[0].codigo,
          );
          if (responseSRI) {
            await this.registrarHistorial({
              tabla,
              identificacion: data[0].cedula_ruc,
              pendiente: false,
              endPoint: 'srienlinea.sri.gob.ec',
              detalle:
                'Se obtuvo la información del SRI & se guardó en la base de datos de mongo',
            });
            return;
          }

          await this.registrarHistorial({
            tabla,
            identificacion: data[0].cedula_ruc,
            pendiente: true,
            endPoint: 'undefined',
            detalle: 'De ningún endoint se obtuvo la información',
          });
        } else {
          await this.sybaseController.eliminarCedulaSybase(data[0].codigo);
          await this.registrarHistorial({
            tabla,
            identificacion: data[0].cedula_ruc,
            pendiente: false,
            endPoint: 'undefined',
            detalle: 'La cedula que se obtuvo de sybase ya existe en mongo',
          });
        }
      }
    } catch (errors) {
      console.error('Todas las solicitudes fallaron:', errors);
    }
  }

  @Cron('*/20 * * * * *')
  async in_cliente() {
    await this.procesarIngreso('in_cliente');
  }

  async requestSRI(cedula: string, codigo: number) {
    const responseSRI = await this.httpService.requestSRI(cedula);
    if (!responseSRI) return false;

    const created = await this.personaService.create({
      nombre: responseSRI.nombreComercial,
      denominacion: responseSRI.denominacion,
      direccionMatriz: responseSRI.direccionMatriz,
      estado: responseSRI.estado,
      identificacion: responseSRI.identificacion,
      tipoIdentificacion: responseSRI.tipoIdentificacion,
    });

    if (created) {
      await this.sybaseController.eliminarCedulaSybase(codigo);
      return true;
    }
    return false;
  }

  async registrarHistorial(props: registrarHistorial) {
    const created = await this.historialService.create({
      sybasedb: process.env.BASE,
      tabla: props.tabla,
      identificacion: props.identificacion,
      pendiente: props.pendiente,
      endPoint: props.endPoint,
      detalle: props.detalle,
    });
    return created;
  }
}
