import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Seccion} from './seccion.model';
import {Propietario} from './propietario.model';

@model()
export class Inmueble extends Entity {
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
  piso: string;

  @property({
    type: 'string',
  })
  sub_piso?: string;

  @belongsTo(() => Seccion)
  seccionId: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
