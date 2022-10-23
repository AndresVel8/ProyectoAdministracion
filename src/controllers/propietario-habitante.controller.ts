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
  Propietario,
  Habitante,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioHabitanteController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Habitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Habitante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Habitante>,
  ): Promise<Habitante[]> {
    return this.propietarioRepository.habitantes(id).find(filter);
  }

  @post('/propietarios/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Habitante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitante, {
            title: 'NewHabitanteInPropietario',
            exclude: ['id'],
            optional: ['propietarioId']
          }),
        },
      },
    }) habitante: Omit<Habitante, 'id'>,
  ): Promise<Habitante> {
    return this.propietarioRepository.habitantes(id).create(habitante);
  }

  @patch('/propietarios/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Propietario.Habitante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Habitante, {partial: true}),
        },
      },
    })
    habitante: Partial<Habitante>,
    @param.query.object('where', getWhereSchemaFor(Habitante)) where?: Where<Habitante>,
  ): Promise<Count> {
    return this.propietarioRepository.habitantes(id).patch(habitante, where);
  }

  @del('/propietarios/{id}/habitantes', {
    responses: {
      '200': {
        description: 'Propietario.Habitante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Habitante)) where?: Where<Habitante>,
  ): Promise<Count> {
    return this.propietarioRepository.habitantes(id).delete(where);
  }
}
