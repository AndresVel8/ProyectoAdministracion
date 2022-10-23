import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Factura} from './factura.model';
import {Transaccion} from './transaccion.model';

@model()
export class FacturaTransaccion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => Factura)
  facturaId: string;

  @belongsTo(() => Transaccion)
  transaccionId: string;

  constructor(data?: Partial<FacturaTransaccion>) {
    super(data);
  }
}

export interface FacturaTransaccionRelations {
  // describe navigational properties here
}

export type FacturaTransaccionWithRelations = FacturaTransaccion & FacturaTransaccionRelations;
