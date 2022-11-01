import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Seccion,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleSeccionController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/seccion', {
    responses: {
      '200': {
        description: 'Seccion belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Seccion)},
          },
        },
      },
    },
  })
  async getSeccion(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Seccion> {
    return this.inmuebleRepository.seccion(id);
  }
}
