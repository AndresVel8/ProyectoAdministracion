import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Seccion,
  Conjunto,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionConjuntoController {
  constructor(
    @repository(SeccionRepository)
    public seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to Seccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof Seccion.prototype.id,
  ): Promise<Conjunto> {
    return this.seccionRepository.conjunto(id);
  }
}
