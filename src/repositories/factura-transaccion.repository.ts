import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {FacturaTransaccion, FacturaTransaccionRelations, Factura, Transaccion} from '../models';
import {FacturaRepository} from './factura.repository';
import {TransaccionRepository} from './transaccion.repository';

export class FacturaTransaccionRepository extends DefaultCrudRepository<
  FacturaTransaccion,
  typeof FacturaTransaccion.prototype.id,
  FacturaTransaccionRelations
> {

  public readonly factura: BelongsToAccessor<Factura, typeof FacturaTransaccion.prototype.id>;

  public readonly transaccion: BelongsToAccessor<Transaccion, typeof FacturaTransaccion.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>,
  ) {
    super(FacturaTransaccion, dataSource);
    this.transaccion = this.createBelongsToAccessorFor('transaccion', transaccionRepositoryGetter,);
    this.registerInclusionResolver('transaccion', this.transaccion.inclusionResolver);
    this.factura = this.createBelongsToAccessorFor('factura', facturaRepositoryGetter,);
    this.registerInclusionResolver('factura', this.factura.inclusionResolver);
  }
}
