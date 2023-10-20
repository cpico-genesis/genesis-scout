import { Controller } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SybaseController } from 'src/sybase/sybase.controller';
import { PersonaService } from 'src/persona/persona.service';
import { HttpCustomService } from 'src/providers/http/http.service';

@Controller()
export class CedulaScheduleController {
  constructor(
    private readonly sybaseController: SybaseController,
    private readonly personaService: PersonaService,
    private readonly httpService: HttpCustomService,
  ) {}

  // @Cron()
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const res = await this.sybaseController.obtenerCedulaSybase();

    if (res && res.length) {
      const persona = await this.personaService.findByParams({
        cedula: res[0].cedula_ruc,
      });
      // si no existe local en mongo
      if (!persona) {
        // petición a SRI
        const promises = [this.httpService.requestSRI(res[0].cedula_ruc)];
        try {
          const responses = await Promise.any(promises);

          const created = await this.personaService.create({
            nombre: responses.nombreComercial,
            denominacion: responses.denominacion,
            direccionMatriz: responses.direccionMatriz,
            estado: responses.estado,
            identificacion: responses.identificacion,
            tipoIdentificacion: responses.tipoIdentificacion,
          });

          if (created) {
            // eliminar de sybase
            await this.sybaseController.eliminarCedulaSybase(res[0].codigo);
          }
        } catch (errors) {
          // Ninguna de las promesas se resolvió con éxito
          console.error('Todas las solicitudes fallaron:', errors);
        }
      } else {
        // eliminar de sybase
        await this.sybaseController.eliminarCedulaSybase(res[0].codigo);
      }
    }
  }
}
