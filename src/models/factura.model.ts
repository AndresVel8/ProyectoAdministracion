import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {FacturaZona} from './factura-zona.model';
import {Conjunto} from './conjunto.model';
import {Administrador} from './administrador.model';
import {Habitante} from './habitante.model';
import {Propietario} from './propietario.model';
import {FacturaTransaccion} from './factura-transaccion.model';

@model()
export class Factura extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  num_factura: string;

  @property({
    type: 'string',
    required: true,
  })
  item: string;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @hasMany(() => FacturaZona)
  facturaZonas: FacturaZona[];

  @belongsTo(() => Conjunto)
  conjuntoId: string;

  @belongsTo(() => Administrador)
  administradorId: string;

  @belongsTo(() => Habitante)
  habitanteId: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @hasMany(() => FacturaTransaccion)
  facturaTransaccions: FacturaTransaccion[];

  constructor(data?: Partial<Factura>) {
    super(data);
  }
}

export interface FacturaRelations {
  // describe navigational properties here
}

export type FacturaWithRelations = Factura & FacturaRelations;
