import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ZonaSocial,
  Conjunto,
} from '../models';
import {ZonaSocialRepository} from '../repositories';

export class ZonaSocialConjuntoController {
  constructor(
    @repository(ZonaSocialRepository)
    public zonaSocialRepository: ZonaSocialRepository,
  ) { }

  @get('/zona-socials/{id}/conjunto', {
    responses: {
      '200': {
        description: 'Conjunto belonging to ZonaSocial',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conjunto)},
          },
        },
      },
    },
  })
  async getConjunto(
    @param.path.string('id') id: typeof ZonaSocial.prototype.id,
  ): Promise<Conjunto> {
    return this.zonaSocialRepository.conjunto(id);
  }
}
