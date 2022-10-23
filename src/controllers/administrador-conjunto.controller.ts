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
  Administrador,
  Conjunto,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorConjuntoController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/conjuntos', {
    responses: {
      '200': {
        description: 'Array of Administrador has many Conjunto',
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
    return this.administradorRepository.conjuntos(id).find(filter);
  }

  @post('/administradors/{id}/conjuntos', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conjunto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conjunto, {
            title: 'NewConjuntoInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) conjunto: Omit<Conjunto, 'id'>,
  ): Promise<Conjunto> {
    return this.administradorRepository.conjuntos(id).create(conjunto);
  }

  @patch('/administradors/{id}/conjuntos', {
    responses: {
      '200': {
        description: 'Administrador.Conjunto PATCH success count',
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
    return this.administradorRepository.conjuntos(id).patch(conjunto, where);
  }

  @del('/administradors/{id}/conjuntos', {
    responses: {
      '200': {
        description: 'Administrador.Conjunto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Conjunto)) where?: Where<Conjunto>,
  ): Promise<Count> {
    return this.administradorRepository.conjuntos(id).delete(where);
  }
}
