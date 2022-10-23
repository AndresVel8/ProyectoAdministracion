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
  Seccion,
  Inmueble,
} from '../models';
import {SeccionRepository} from '../repositories';

export class SeccionInmuebleController {
  constructor(
    @repository(SeccionRepository) protected seccionRepository: SeccionRepository,
  ) { }

  @get('/seccions/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Seccion has many Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.seccionRepository.inmuebles(id).find(filter);
  }

  @post('/seccions/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Seccion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Seccion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInSeccion',
            exclude: ['id'],
            optional: ['seccionId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.seccionRepository.inmuebles(id).create(inmueble);
  }

  @patch('/seccions/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Seccion.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.seccionRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/seccions/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Seccion.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.seccionRepository.inmuebles(id).delete(where);
  }
}
