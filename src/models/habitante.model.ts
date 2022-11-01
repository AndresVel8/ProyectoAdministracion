import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Factura} from './factura.model';
import {Transaccion} from './transaccion.model';
import {Propietario} from './propietario.model';

@model()
export class Habitante extends Entity {
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
  primer_nombre: string;

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
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  parentesco: string;

  @hasMany(() => Factura)
  facturas: Factura[];

  @hasMany(() => Transaccion)
  transaccions: Transaccion[];

  @belongsTo(() => Propietario)
  propietarioId: string;

  constructor(data?: Partial<Habitante>) {
    super(data);
  }
}

export interface HabitanteRelations {
  // describe navigational properties here
}

export type HabitanteWithRelations = Habitante & HabitanteRelations;
