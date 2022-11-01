import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Contador,
  Conjunto,
} from '../models';
import {ContadorRepository} from '../repositories';

export class ContadorConjuntoController {
  constructor(
    @repository(ContadorRepository) protected contadorRepository: ContadorRepository,
  ) { }

  @get('/contadors/{id}/conjuntos', {
    responses: {
      '200': {
        description: 'Array of Contador has many Conjunto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Conjunto>,
  ): Promise<Conjunto[]> {
    return this.contadorRepository.conjuntos(id).find(filter);
  }

  @post('/contadors/{id}/conjuntos', {
    responses: {
      '200': {
        description: 'Contador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conjunto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Contador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {
            title: 'NewConjuntoInContador',
            exclude: ['id'],
            optional: ['contadorId']
          }),
        },
      },
    }) conjunto: Omit<Conjunto, 'id'>,
  ): Promise<Conjunto> {
    return this.contadorRepository.conjuntos(id).create(conjunto);
  }

  @patch('/contadors/{id}/conjuntos', {
    responses: {
      '200': {
        description: 'Contador.Conjunto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {partial: true}),
        },
      },
    })
    conjunto: Partial<Conjunto>,
    @param.query.object('where', getWhereSchemaFor(Conjunto)) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.contadorRepository.conjuntos(id).patch(conjunto, where);
  }

  @del('/contadors/{id}/conjuntos', {
    responses: {
      '200': {
        description: 'Contador.Conjunto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Conjunto)) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.contadorRepository.conjuntos(id).delete(where);
  }
}
