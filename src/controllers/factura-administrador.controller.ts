import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Factura,
  Administrador,
} from '../models';
import {FacturaRepository} from '../repositories';

export class FacturaAdministradorController {
  constructor(
    @repository(FacturaRepository)
    public facturaRepository: FacturaRepository,
  ) { }

  @get('/facturas/{id}/administrador', {
    responses: {
      '200': {
        description: 'Administrador belonging to Factura',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Administrador)},
          },
        },
      },
    },
  })
  async getAdministrador(
    @param.path.string('id') id: typeof Factura.prototype.id,
  ): Promise<Administrador> {
    return this.facturaRepository.administrador(id);
  }
}
