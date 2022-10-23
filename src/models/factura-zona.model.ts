import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ZonaSocial} from './zona-social.model';
import {Factura} from './factura.model';

@model()
export class FacturaZona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @belongsTo(() => ZonaSocial)
  zonaSocialId: string;

  @belongsTo(() => Factura)
  facturaId: string;

  constructor(data?: Partial<FacturaZona>) {
    super(data);
  }
}

export interface FacturaZonaRelations {
  // describe navigational properties here
}

export type FacturaZonaWithRelations = FacturaZona & FacturaZonaRelations;
