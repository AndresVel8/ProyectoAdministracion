import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Factura, FacturaRelations, FacturaZona, Conjunto, Administrador, Habitante, Propietario, FacturaTransaccion} from '../models';
import {FacturaZonaRepository} from './factura-zona.repository';
import {ConjuntoRepository} from './conjunto.repository';
import {AdministradorRepository} from './administrador.repository';
import {HabitanteRepository} from './habitante.repository';
import {PropietarioRepository} from './propietario.repository';
import {FacturaTransaccionRepository} from './factura-transaccion.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly facturaZonas: HasManyRepositoryFactory<FacturaZona, typeof Factura.prototype.id>;

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Factura.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Factura.prototype.id>;

  public readonly habitante: BelongsToAccessor<Habitante, typeof Factura.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Factura.prototype.id>;

  public readonly facturaTransaccions: HasManyRepositoryFactory<FacturaTransaccion, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('FacturaZonaRepository') protected facturaZonaRepositoryGetter: Getter<FacturaZonaRepository>, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('HabitanteRepository') protected habitanteRepositoryGetter: Getter<HabitanteRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('FacturaTransaccionRepository') protected facturaTransaccionRepositoryGetter: Getter<FacturaTransaccionRepository>,
  ) {
    super(Factura, dataSource);
    this.facturaTransaccions = this.createHasManyRepositoryFactoryFor('facturaTransaccions', facturaTransaccionRepositoryGetter,);
    this.registerInclusionResolver('facturaTransaccions', this.facturaTransaccions.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.habitante = this.createBelongsToAccessorFor('habitante', habitanteRepositoryGetter,);
    this.registerInclusionResolver('habitante', this.habitante.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
    this.facturaZonas = this.createHasManyRepositoryFactoryFor('facturaZonas', facturaZonaRepositoryGetter,);
    this.registerInclusionResolver('facturaZonas', this.facturaZonas.inclusionResolver);
  }
}
