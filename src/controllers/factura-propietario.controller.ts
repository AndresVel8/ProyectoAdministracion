import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Propietario,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaPropietarioController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Propietario> {
    return this.facturaRepository.propietario(id);
  }
}
