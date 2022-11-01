import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {FacturaTransaccion} from './factura-transaccion.model';
import {Propietario} from './propietario.model';
import {Habitante} from './habitante.model';

@model()
export class Transaccion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  monto: number;

  @property({
    type: 'number',
    required: true,
  })
  cuenta_bancaria: number;

  @property({
    type: 'string',
    required: true,
  })
  banco: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @hasMany(() => FacturaTransaccion)
  facturaTransaccions: FacturaTransaccion[];

  @belongsTo(() => Propietario)
  propietarioId: string;

  @belongsTo(() => Habitante)
  habitanteId: string;

  constructor(data?: Partial<Transaccion>) {
    super(data);
  }
}

export interface TransaccionRelations {
  // describe navigational properties here
}

export type TransaccionWithRelations = Transaccion & TransaccionRelations;
