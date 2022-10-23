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
  Conjunto,
  ZonaSocial,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoZonaSocialController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/zona-socials', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many ZonaSocial',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ZonaSocial)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ZonaSocial>,
  ): Promise<ZonaSocial[]> {
    return this.conjuntoRepository.zonaSocials(id).find(filter);
  }

  @post('/conjuntos/{id}/zona-socials', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(ZonaSocial)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonaSocial, {
            title: 'NewZonaSocialInConjunto',
            exclude: ['id'],
            optional: ['conjuntoId']
          }),
        },
      },
    }) zonaSocial: Omit<ZonaSocial, 'id'>,
  ): Promise<ZonaSocial> {
    return this.conjuntoRepository.zonaSocials(id).create(zonaSocial);
  }

  @patch('/conjuntos/{id}/zona-socials', {
    responses: {
      '200': {
        description: 'Conjunto.ZonaSocial PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ZonaSocial, {partial: true}),
        },
      },
    })
    zonaSocial: Partial<ZonaSocial>,
    @param.query.object('where', getWhereSchemaFor(ZonaSocial)) where?: Where<ZonaSocial>,
  ): Promise<Count> {
    return this.conjuntoRepository.zonaSocials(id).patch(zonaSocial, where);
  }

  @del('/conjuntos/{id}/zona-socials', {
    responses: {
      '200': {
        description: 'Conjunto.ZonaSocial DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ZonaSocial)) where?: Where<ZonaSocial>,
  ): Promise<Count> {
    return this.conjuntoRepository.zonaSocials(id).delete(where);
  }
}
