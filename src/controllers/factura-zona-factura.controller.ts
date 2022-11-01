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
  Factura,
} from '../models';
import {FacturaZonaRepository} from '../repositories';

export class FacturaZonaFacturaController {
  constructor(
    @repository(FacturaZonaRepository)
    public facturaZonaRepository: FacturaZonaRepository,
  ) { }

  @get('/factura-zonas/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to FacturaZona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof FacturaZona.prototype.id,
  ): Promise<Factura> {
    return this.facturaZonaRepository.factura(id);
  }
}
