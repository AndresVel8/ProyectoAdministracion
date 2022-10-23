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
  Factura,
  FacturaTransaccion,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaFacturaTransaccionController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/factura-transaccions', {
    responses: {
      '200': {
        description: 'Array of Factura has many FacturaTransaccion',
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
    return this.facturaRepository.facturaTransaccions(id).find(filter);
  }

  @post('/facturas/{id}/factura-transaccions', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(FacturaTransaccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaTransaccion, {
            title: 'NewFacturaTransaccionInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) facturaTransaccion: Omit<FacturaTransaccion, 'id'>,
  ): Promise<FacturaTransaccion> {
    return this.facturaRepository.facturaTransaccions(id).create(facturaTransaccion);
  }

  @patch('/facturas/{id}/factura-transaccions', {
    responses: {
      '200': {
        description: 'Factura.FacturaTransaccion PATCH success count',
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
    return this.facturaRepository.facturaTransaccions(id).patch(facturaTransaccion, where);
  }

  @del('/facturas/{id}/factura-transaccions', {
    responses: {
      '200': {
        description: 'Factura.FacturaTransaccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FacturaTransaccion)) where?: Where<FacturaTransaccion>,
  ): Promise<Count> {
    return this.facturaRepository.facturaTransaccions(id).delete(where);
  }
}
