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
  FacturaZona,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaFacturaZonaController {
  constructor(
    @repository(FacturaRepository) protected facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/factura-zonas', {
    responses: {
      '200': {
        description: 'Array of Factura has many FacturaZona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FacturaZona)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<FacturaZona>,
  ): Promise<FacturaZona[]> {
    return this.facturaRepository.facturaZonas(id).find(filter);
  }

  @post('/facturas/{id}/factura-zonas', {
    responses: {
      '200': {
        description: 'Factura model instance',
        content: {'application/json': {schema: getModelSchemaRef(FacturaZona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Factura.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaZona, {
            title: 'NewFacturaZonaInFactura',
            exclude: ['id'],
            optional: ['facturaId']
          }),
        },
      },
    }) facturaZona: Omit<FacturaZona, 'id'>,
  ): Promise<FacturaZona> {
    return this.facturaRepository.facturaZonas(id).create(facturaZona);
  }

  @patch('/facturas/{id}/factura-zonas', {
    responses: {
      '200': {
        description: 'Factura.FacturaZona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaZona, {partial: true}),
        },
      },
    })
    facturaZona: Partial<FacturaZona>,
    @param.query.object('where', getWhereSchemaFor(FacturaZona)) where?: Where<FacturaZona>,
  ): Promise<Count> {
    return this.facturaRepository.facturaZonas(id).patch(facturaZona, where);
  }

  @del('/facturas/{id}/factura-zonas', {
    responses: {
      '200': {
        description: 'Factura.FacturaZona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FacturaZona)) where?: Where<FacturaZona>,
  ): Promise<Count> {
    return this.facturaRepository.facturaZonas(id).delete(where);
  }
}
