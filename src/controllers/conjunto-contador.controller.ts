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
  Contador,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoContadorController {
  constructor(
    @repository(ConjuntoRepository)
    public conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/contador', {
    responses: {
      '200': {
        description: 'Contador belonging to Conjunto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Contador)},
          },
        },
      },
    },
  })
  async getContador(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
  ): Promise<Contador> {
    return this.conjuntoRepository.contador(id);
  }
}
