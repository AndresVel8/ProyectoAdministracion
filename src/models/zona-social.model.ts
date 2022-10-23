import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Conjunto} from './conjunto.model';
import {FacturaZona} from './factura-zona.model';

@model()
export class ZonaSocial extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  costo: number;

  @property({
    type: 'date',
    required: true,
  })
  horario_acceso: string;

  @belongsTo(() => Conjunto)
  conjuntoId: string;

  @hasMany(() => FacturaZona)
  facturaZonas: FacturaZona[];

  constructor(data?: Partial<ZonaSocial>) {
    super(data);
  }
}

export interface ZonaSocialRelations {
  // describe navigational properties here
}

export type ZonaSocialWithRelations = ZonaSocial & ZonaSocialRelations;
