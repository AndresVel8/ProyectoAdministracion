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
  Conjunto,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaConjuntoController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Conjunto> {
    return this.facturaRepository.conjunto(id);
  }
}
