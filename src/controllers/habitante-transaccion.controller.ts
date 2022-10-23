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
  Habitante,
  Transaccion,
} from '../models';
import {HabitanteRepository} from '../repositories';

export class HabitanteTransaccionController {
  constructor(
    @repository(HabitanteRepository) protected habitanteRepository: HabitanteRepository,
  ) { }

  @get('/habitantes/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Array of Habitante has many Transaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Transaccion>,
  ): Promise<Transaccion[]> {
    return this.habitanteRepository.transaccions(id).find(filter);
  }

  @post('/habitantes/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Habitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transaccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Habitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {
            title: 'NewTransaccionInHabitante',
            exclude: ['id'],
            optional: ['habitanteId']
          }),
        },
      },
    }) transaccion: Omit<Transaccion, 'id'>,
  ): Promise<Transaccion> {
    return this.habitanteRepository.transaccions(id).create(transaccion);
  }

  @patch('/habitantes/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Habitante.Transaccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transaccion, {partial: true}),
        },
      },
    })
    transaccion: Partial<Transaccion>,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.habitanteRepository.transaccions(id).patch(transaccion, where);
  }

  @del('/habitantes/{id}/transaccions', {
    responses: {
      '200': {
        description: 'Habitante.Transaccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transaccion)) where?: Where<Transaccion>,
  ): Promise<Count> {
    return this.habitanteRepository.transaccions(id).delete(where);
  }
}
