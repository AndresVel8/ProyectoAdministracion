import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Habitante,
  Propietario,
} from '../models';
import {HabitanteRepository} from '../repositories';

export class HabitantePropietarioController {
  constructor(
    @repository(HabitanteRepository)
    public habitanteRepository: HabitanteRepository,
  ) { }

  @get('/habitantes/{id}/propietario', {
    responses: {
      '200': {
        description: 'Propietario belonging to Habitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propietario)},
          },
        },
      },
    },
  })
  async getPropietario(
    @param.path.string('id') id: typeof Habitante.prototype.id,
  ): Promise<Propietario> {
    return this.habitanteRepository.propietario(id);
  }
}
