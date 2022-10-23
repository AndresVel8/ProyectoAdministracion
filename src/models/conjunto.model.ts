import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Seccion} from './seccion.model';
import {Contador} from './contador.model';
import {ZonaSocial} from './zona-social.model';
import {Administrador} from './administrador.model';
import {Factura} from './factura.model';

@model()
export class Conjunto extends Entity {
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
  nombre_conjunto: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  estrato: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

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
    type: 'number',
    required: true,
  })
  interes_mora: number;

  @property({
    type: 'string',
    required: true,
  })
  inicio_factura: string;

  @property({
    type: 'number',
    required: true,
  })
  presupuesto: number;

  @hasMany(() => Seccion)
  seccions: Seccion[];

  @belongsTo(() => Contador)
  contadorId: string;

  @hasMany(() => ZonaSocial)
  zonaSocials: ZonaSocial[];

  @belongsTo(() => Administrador)
  administradorId: string;

  @hasMany(() => Factura)
  facturas: Factura[];

  constructor(data?: Partial<Conjunto>) {
    super(data);
  }
}

export interface ConjuntoRelations {
  // describe navigational properties here
}

export type ConjuntoWithRelations = Conjunto & ConjuntoRelations;
