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
import {FacturaZona} from '../models';
import {FacturaZonaRepository} from '../repositories';

export class FacturaZonaController {
  constructor(
    @repository(FacturaZonaRepository)
    public facturaZonaRepository : FacturaZonaRepository,
  ) {}

  @post('/factura-zonas')
  @response(200, {
    description: 'FacturaZona model instance',
    content: {'application/json': {schema: getModelSchemaRef(FacturaZona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaZona, {
            title: 'NewFacturaZona',
            exclude: ['id'],
          }),
        },
      },
    })
    facturaZona: Omit<FacturaZona, 'id'>,
  ): Promise<FacturaZona> {
    return this.facturaZonaRepository.create(facturaZona);
  }

  @get('/factura-zonas/count')
  @response(200, {
    description: 'FacturaZona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(FacturaZona) where?: Where<FacturaZona>,
  ): Promise<Count> {
    return this.facturaZonaRepository.count(where);
  }

  @get('/factura-zonas')
  @response(200, {
    description: 'Array of FacturaZona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(FacturaZona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(FacturaZona) filter?: Filter<FacturaZona>,
  ): Promise<FacturaZona[]> {
    return this.facturaZonaRepository.find(filter);
  }

  @patch('/factura-zonas')
  @response(200, {
    description: 'FacturaZona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaZona, {partial: true}),
        },
      },
    })
    facturaZona: FacturaZona,
    @param.where(FacturaZona) where?: Where<FacturaZona>,
  ): Promise<Count> {
    return this.facturaZonaRepository.updateAll(facturaZona, where);
  }

  @get('/factura-zonas/{id}')
  @response(200, {
    description: 'FacturaZona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(FacturaZona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FacturaZona, {exclude: 'where'}) filter?: FilterExcludingWhere<FacturaZona>
  ): Promise<FacturaZona> {
    return this.facturaZonaRepository.findById(id, filter);
  }

  @patch('/factura-zonas/{id}')
  @response(204, {
    description: 'FacturaZona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaZona, {partial: true}),
        },
      },
    })
    facturaZona: FacturaZona,
  ): Promise<void> {
    await this.facturaZonaRepository.updateById(id, facturaZona);
  }

  @put('/factura-zonas/{id}')
  @response(204, {
    description: 'FacturaZona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() facturaZona: FacturaZona,
  ): Promise<void> {
    await this.facturaZonaRepository.replaceById(id, facturaZona);
  }

  @del('/factura-zonas/{id}')
  @response(204, {
    description: 'FacturaZona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.facturaZonaRepository.deleteById(id);
  }
}
