import {Entity, model, property, hasMany} from '@loopback/repository';
import {Conjunto} from './conjunto.model';

@model()
export class Contador extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  primer_nombre: string;

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
  segundo_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  primer_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  segundo_apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  targeta_profesional: string;

  @hasMany(() => Conjunto)
  conjuntos: Conjunto[];

  constructor(data?: Partial<Contador>) {
    super(data);
  }
}

export interface ContadorRelations {
  // describe navigational properties here
}

export type ContadorWithRelations = Contador & ContadorRelations;
