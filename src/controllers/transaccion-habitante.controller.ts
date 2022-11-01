import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Transaccion,
  Habitante,
} from '../models';
import {TransaccionRepository} from '../repositories';

export class TransaccionHabitanteController {
  constructor(
    @repository(TransaccionRepository)
    public transaccionRepository: TransaccionRepository,
  ) { }

  @get('/transaccions/{id}/habitante', {
    responses: {
      '200': {
        description: 'Habitante belonging to Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habitante)},
          },
        },
      },
    },
  })
  async getHabitante(
    @param.path.string('id') id: typeof Transaccion.prototype.id,
  ): Promise<Habitante> {
    return this.transaccionRepository.habitante(id);
  }
}
