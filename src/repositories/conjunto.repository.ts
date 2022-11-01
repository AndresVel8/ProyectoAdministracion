import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Conjunto, ConjuntoRelations, Seccion, Contador, ZonaSocial, Administrador, Factura} from '../models';
import {SeccionRepository} from './seccion.repository';
import {ContadorRepository} from './contador.repository';
import {ZonaSocialRepository} from './zona-social.repository';
import {AdministradorRepository} from './administrador.repository';
import {FacturaRepository} from './factura.repository';

export class ConjuntoRepository extends DefaultCrudRepository<
  Conjunto,
  typeof Conjunto.prototype.id,
  ConjuntoRelations
> {

  public readonly seccions: HasManyRepositoryFactory<Seccion, typeof Conjunto.prototype.id>;

  public readonly contador: BelongsToAccessor<Contador, typeof Conjunto.prototype.id>;

  public readonly zonaSocials: HasManyRepositoryFactory<ZonaSocial, typeof Conjunto.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Conjunto.prototype.id>;

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Conjunto.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>, @repository.getter('ContadorRepository') protected contadorRepositoryGetter: Getter<ContadorRepository>, @repository.getter('ZonaSocialRepository') protected zonaSocialRepositoryGetter: Getter<ZonaSocialRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Conjunto, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.zonaSocials = this.createHasManyRepositoryFactoryFor('zonaSocials', zonaSocialRepositoryGetter,);
    this.registerInclusionResolver('zonaSocials', this.zonaSocials.inclusionResolver);
    this.contador = this.createBelongsToAccessorFor('contador', contadorRepositoryGetter,);
    this.registerInclusionResolver('contador', this.contador.inclusionResolver);
    this.seccions = this.createHasManyRepositoryFactoryFor('seccions', seccionRepositoryGetter,);
    this.registerInclusionResolver('seccions', this.seccions.inclusionResolver);
  }
}
