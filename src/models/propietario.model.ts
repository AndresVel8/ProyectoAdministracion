import {Entity, model, property, hasMany} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Factura} from './factura.model';
import {Transaccion} from './transaccion.model';
import {Habitante} from './habitante.model';

@model()
export class Propietario extends Entity {
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
  contrasena: string;

  @property({
    type: 'string',
    required: true,
  })
  escritura: string;

  @hasMany(() => Inmueble)
  inmuebles: Inmueble[];

  @hasMany(() => Factura)
  facturas: Factura[];

  @hasMany(() => Transaccion)
  transaccions: Transaccion[];

  @hasMany(() => Habitante)
  habitantes: Habitante[];

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
