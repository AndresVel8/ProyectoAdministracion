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
  Factura,
} from '../models';
import {HabitanteRepository} from '../repositories';

export class HabitanteFacturaController {
  constructor(
    @repository(HabitanteRepository) protected habitanteRepository: HabitanteRepository,
  ) { }

  @get('/habitantes/{id}/facturas', {
    responses: {
      '200': {
        description: 'Array of Habitante has many Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Factura>,
  ): Promise<Factura[]> {
    return this.habitanteRepository.facturas(id).find(filter);
  }

  @post('/habitantes/{id}/facturas', {
    responses: {
      '200': {
        description: 'Habitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Factura)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Habitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {
            title: 'NewFacturaInHabitante',
            exclude: ['id'],
            optional: ['habitanteId']
          }),
        },
      },
    }) factura: Omit<Factura, 'id'>,
  ): Promise<Factura> {
    return this.habitanteRepository.facturas(id).create(factura);
  }

  @patch('/habitantes/{id}/facturas', {
    responses: {
      '200': {
        description: 'Habitante.Factura PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Factura, {partial: true}),
        },
      },
    })
    factura: Partial<Factura>,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.habitanteRepository.facturas(id).patch(factura, where);
  }

  @del('/habitantes/{id}/facturas', {
    responses: {
      '200': {
        description: 'Habitante.Factura DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Factura)) where?: Where<Factura>,
  ): Promise<Count> {
    return this.habitanteRepository.facturas(id).delete(where);
  }
}
