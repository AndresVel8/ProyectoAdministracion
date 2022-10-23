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
  Seccion,
} from '../models';
import {ConjuntoRepository} from '../repositories';

export class ConjuntoSeccionController {
  constructor(
    @repository(ConjuntoRepository) protected conjuntoRepository: ConjuntoRepository,
  ) { }

  @get('/conjuntos/{id}/seccions', {
    responses: {
      '200': {
        description: 'Array of Conjunto has many Seccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seccion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Seccion>,
  ): Promise<Seccion[]> {
    return this.conjuntoRepository.seccions(id).find(filter);
  }

  @post('/conjuntos/{id}/seccions', {
    responses: {
      '200': {
        description: 'Conjunto model instance',
        content: {'application/json': {schema: getModelSchemaRef(Seccion)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Conjunto.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {
            title: 'NewSeccionInConjunto',
            exclude: ['id'],
            optional: ['conjuntoId']
          }),
        },
      },
    }) seccion: Omit<Seccion, 'id'>,
  ): Promise<Seccion> {
    return this.conjuntoRepository.seccions(id).create(seccion);
  }

  @patch('/conjuntos/{id}/seccions', {
    responses: {
      '200': {
        description: 'Conjunto.Seccion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seccion, {partial: true}),
        },
      },
    })
    seccion: Partial<Seccion>,
    @param.query.object('where', getWhereSchemaFor(Seccion)) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.conjuntoRepository.seccions(id).patch(seccion, where);
  }

  @del('/conjuntos/{id}/seccions', {
    responses: {
      '200': {
        description: 'Conjunto.Seccion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Seccion)) where?: Where<Seccion>,
  ): Promise<Count> {
    return this.conjuntoRepository.seccions(id).delete(where);
  }
}
