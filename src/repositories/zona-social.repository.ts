import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {ZonaSocial, ZonaSocialRelations, Conjunto, FacturaZona} from '../models';
import {ConjuntoRepository} from './conjunto.repository';
import {FacturaZonaRepository} from './factura-zona.repository';

export class ZonaSocialRepository extends DefaultCrudRepository<
  ZonaSocial,
  typeof ZonaSocial.prototype.id,
  ZonaSocialRelations
> {

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof ZonaSocial.prototype.id>;

  public readonly facturaZonas: HasManyRepositoryFactory<FacturaZona, typeof ZonaSocial.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>, @repository.getter('FacturaZonaRepository') protected facturaZonaRepositoryGetter: Getter<FacturaZonaRepository>,
  ) {
    super(ZonaSocial, dataSource);
    this.facturaZonas = this.createHasManyRepositoryFactoryFor('facturaZonas', facturaZonaRepositoryGetter,);
    this.registerInclusionResolver('facturaZonas', this.facturaZonas.inclusionResolver);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
  }
}
