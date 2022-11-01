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
  ZonaSocial,
  FacturaZona,
} from '../models';
import {ZonaSocialRepository} from '../repositories';

export class ZonaSocialFacturaZonaController {
  constructor(
    @repository(ZonaSocialRepository) protected zonaSocialRepository: ZonaSocialRepository,
  ) { }

  @get('/zona-socials/{id}/factura-zonas', {
    responses: {
      '200': {
        description: 'Array of ZonaSocial has many FacturaZona',
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
    return this.zonaSocialRepository.facturaZonas(id).find(filter);
  }

  @post('/zona-socials/{id}/factura-zonas', {
    responses: {
      '200': {
        description: 'ZonaSocial model instance',
        content: {'application/json': {schema: getModelSchemaRef(FacturaZona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ZonaSocial.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FacturaZona, {
            title: 'NewFacturaZonaInZonaSocial',
            exclude: ['id'],
            optional: ['zonaSocialId']
          }),
        },
      },
    }) facturaZona: Omit<FacturaZona, 'id'>,
  ): Promise<FacturaZona> {
    return this.zonaSocialRepository.facturaZonas(id).create(facturaZona);
  }

  @patch('/zona-socials/{id}/factura-zonas', {
    responses: {
      '200': {
        description: 'ZonaSocial.FacturaZona PATCH success count',
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
    return this.zonaSocialRepository.facturaZonas(id).patch(facturaZona, where);
  }

  @del('/zona-socials/{id}/factura-zonas', {
    responses: {
      '200': {
        description: 'ZonaSocial.FacturaZona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(FacturaZona)) where?: Where<FacturaZona>,
  ): Promise<Count> {
    return this.zonaSocialRepository.facturaZonas(id).delete(where);
  }
}
