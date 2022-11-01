import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {FacturaZona, FacturaZonaRelations, ZonaSocial, Factura} from '../models';
import {ZonaSocialRepository} from './zona-social.repository';
import {FacturaRepository} from './factura.repository';

export class FacturaZonaRepository extends DefaultCrudRepository<
  FacturaZona,
  typeof FacturaZona.prototype.id,
  FacturaZonaRelations
> {

  public readonly zonaSocial: BelongsToAccessor<ZonaSocial, typeof FacturaZona.prototype.id>;

  public readonly factura: BelongsToAccessor<Factura, typeof FacturaZona.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('ZonaSocialRepository') protected zonaSocialRepositoryGetter: Getter<ZonaSocialRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(FacturaZona, dataSource);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
    this.zonaSocial = this.createBelongsToAccessorFor('zonaSocial', zonaSocialRepositoryGetter,);
    this.registerInclusionResolver('zonaSocial', this.zonaSocial.inclusionResolver);
  }
}
