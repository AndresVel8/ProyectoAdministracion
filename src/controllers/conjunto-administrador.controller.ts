import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Conjunto,
  Administrador,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoAdministradorController {
  constructor(
    @repository(ConjuntoRepository)
    public conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Conjunto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
  ): Promise<Administrador> {
    return this.conjuntoRepository.administrador(id);
  }
}
