import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FacturaZona,
  ZonaSocial,
} from '../models';
import {FacturaZonaRepository} from '../repositories';

export class FacturaZonaZonaSocialController {
  constructor(
    @repository(FacturaZonaRepository)
    public facturaZonaRepository: FacturaZonaRepository,
  ) { }

  @get('/factura-zonas/{id}/zona-social', {
    responses: {
      '200': {
        description: 'ZonaSocial belonging to FacturaZona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ZonaSocial)},
          },
        },
      },
    },
  })
  async getZonaSocial(
    @param.path.string('id') id: typeof FacturaZona.prototype.id,
  ): Promise<ZonaSocial> {
    return this.facturaZonaRepository.zonaSocial(id);
  }
}
