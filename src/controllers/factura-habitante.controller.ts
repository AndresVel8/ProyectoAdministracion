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
  Habitante,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaHabitanteController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/habitante', {
    responses: {
      '200': {
        description: 'Habitante belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habitante)},
          },
        },
      },
    },
  })
  async getHabitante(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Habitante> {
    return this.facturaRepository.habitante(id);
  }
}
