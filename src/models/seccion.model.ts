import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Conjunto} from './conjunto.model';

@model()
export class Seccion extends Entity {
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
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  cardinalidad: string;

  @property({
    type: 'string',
    required: true,
  })
  numero: string;

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  @belongsTo(() => Conjunto)
  conjuntoId: string;

  constructor(data?: Partial<Seccion>) {
    super(data);
  }
}

export interface SeccionRelations {
  // describe navigational properties here
}

export type SeccionWithRelations = Seccion & SeccionRelations;
