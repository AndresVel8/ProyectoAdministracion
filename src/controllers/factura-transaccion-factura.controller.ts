import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  FacturaTransaccion,
  Factura,
} from '../models';
import {FacturaTransaccionRepository} from '../repositories';

export class FacturaTransaccionFacturaController {
  constructor(
    @repository(FacturaTransaccionRepository)
    public facturaTransaccionRepository: FacturaTransaccionRepository,
  ) { }

  @get('/factura-transaccions/{id}/factura', {
    responses: {
      '200': {
        description: 'Factura belonging to FacturaTransaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Factura)},
          },
        },
      },
    },
  })
  async getFactura(
    @param.path.string('id') id: typeof FacturaTransaccion.prototype.id,
  ): Promise<Factura> {
    return this.facturaTransaccionRepository.factura(id);
  }
}
