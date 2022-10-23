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
  Transaccion,
} from '../models';
import {FacturaTransaccionRepository} from '../repositories';

export class FacturaTransaccionTransaccionController {
  constructor(
    @repository(FacturaTransaccionRepository)
    public facturaTransaccionRepository: FacturaTransaccionRepository,
  ) { }

  @get('/factura-transaccions/{id}/transaccion', {
    responses: {
      '200': {
        description: 'Transaccion belonging to FacturaTransaccion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transaccion)},
          },
        },
      },
    },
  })
  async getTransaccion(
    @param.path.string('id') id: typeof FacturaTransaccion.prototype.id,
  ): Promise<Transaccion> {
    return this.facturaTransaccionRepository.transaccion(id);
  }
}
