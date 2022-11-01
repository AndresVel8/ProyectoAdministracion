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
  Propietario,
} from '../models';
import {TransaccionRepository} from '../repositories';

export class TransaccionPropietarioController {
  constructor(
    @repository(TransaccionRepository)
    public transaccionRepository: TransaccionRepository,
  ) { }

  @get('/transaccions/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Transaccion.prototype.id,
  ): Promise<Propietario> {
    return this.transaccionRepository.propietario(id);
  }
}
