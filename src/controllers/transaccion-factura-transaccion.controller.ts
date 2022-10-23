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
  Transaccion,
  FacturaTransaccion,
} from '../models';
import {TransaccionRepository} from '../repositories';

export class TransaccionFacturaTransaccionController {
  constructor(
    @repository(TransaccionRepository) protected transaccionRepository: TransaccionRepository,
  ) { }

  @get('/transaccions/{id}/factura-transaccions', {
    responses: {
      '200': {
        description: 'Array of Transaccion has many FacturaTransaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FacturaTransaccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<FacturaTransaccion>,
  ): Promise<FacturaTransaccion[]> {
    return this.transaccionRepository.facturaTransaccions(id).find(filter);
  }

  @post('/transaccions/{id}/factura-transaccions', {
    responses: {
      '200': {
        description: 'Transaccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(FacturaTransaccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Transaccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaTransaccion, {
            title: 'NewFacturaTransaccionInTransaccion',
            exclude: ['id'],
            optional: ['transaccionId']
          }),
        },
      },
    }) facturaTransaccion: Omit<FacturaTransaccion, 'id'>,
  ): Promise<FacturaTransaccion> {
    return this.transaccionRepository.facturaTransaccions(id).create(facturaTransaccion);
  }

  @patch('/transaccions/{id}/factura-transaccions', {
    responses: {
      '200': {
        description: 'Transaccion.FacturaTransaccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaTransaccion, {partial: true}),
        },
      },
    })
    facturaTransaccion: Partial<FacturaTransaccion>,
    @param.query.object('where', getWhereSchemaFor(FacturaTransaccion)) where?: Where<FacturaTransaccion>,
  ): Promise<Count> {
    return this.transaccionRepository.facturaTransaccions(id).patch(facturaTransaccion, where);
  }

  @del('/transaccions/{id}/factura-transaccions', {
    responses: {
      '200': {
        description: 'Transaccion.FacturaTransaccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FacturaTransaccion)) where?: Where<FacturaTransaccion>,
  ): Promise<Count> {
    return this.transaccionRepository.facturaTransaccions(id).delete(where);
  }
}
