import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {FacturaTransaccion} from '../models';
import {FacturaTransaccionRepository} from '../repositories';

export class FacturaTransaccionController {
  constructor(
    @repository(FacturaTransaccionRepository)
    public facturaTransaccionRepository : FacturaTransaccionRepository,
  ) {}

  @post('/factura-transaccions')
  @response(200, {
    description: 'FacturaTransaccion model instance',
    content: {'application/json': {schema: getModelSchemaRef(FacturaTransaccion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaTransaccion, {
            title: 'NewFacturaTransaccion',
            exclude: ['id'],
          }),
        },
      },
    })
    facturaTransaccion: Omit<FacturaTransaccion, 'id'>,
  ): Promise<FacturaTransaccion> {
    return this.facturaTransaccionRepository.create(facturaTransaccion);
  }

  @get('/factura-transaccions/count')
  @response(200, {
    description: 'FacturaTransaccion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FacturaTransaccion) where?: Where<FacturaTransaccion>,
  ): Promise<Count> {
    return this.facturaTransaccionRepository.count(where);
  }

  @get('/factura-transaccions')
  @response(200, {
    description: 'Array of FacturaTransaccion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FacturaTransaccion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FacturaTransaccion) filter?: Filter<FacturaTransaccion>,
  ): Promise<FacturaTransaccion[]> {
    return this.facturaTransaccionRepository.find(filter);
  }

  @patch('/factura-transaccions')
  @response(200, {
    description: 'FacturaTransaccion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaTransaccion, {partial: true}),
        },
      },
    })
    facturaTransaccion: FacturaTransaccion,
    @param.where(FacturaTransaccion) where?: Where<FacturaTransaccion>,
  ): Promise<Count> {
    return this.facturaTransaccionRepository.updateAll(facturaTransaccion, where);
  }

  @get('/factura-transaccions/{id}')
  @response(200, {
    description: 'FacturaTransaccion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FacturaTransaccion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FacturaTransaccion, {exclude: 'where'}) filter?: FilterExcludingWhere<FacturaTransaccion>
  ): Promise<FacturaTransaccion> {
    return this.facturaTransaccionRepository.findById(id, filter);
  }

  @patch('/factura-transaccions/{id}')
  @response(204, {
    description: 'FacturaTransaccion PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaTransaccion, {partial: true}),
        },
      },
    })
    facturaTransaccion: FacturaTransaccion,
  ): Promise<void> {
    await this.facturaTransaccionRepository.updateById(id, facturaTransaccion);
  }

  @put('/factura-transaccions/{id}')
  @response(204, {
    description: 'FacturaTransaccion PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() facturaTransaccion: FacturaTransaccion,
  ): Promise<void> {
    await this.facturaTransaccionRepository.replaceById(id, facturaTransaccion);
  }

  @del('/factura-transaccions/{id}')
  @response(204, {
    description: 'FacturaTransaccion DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.facturaTransaccionRepository.deleteById(id);
  }
}
