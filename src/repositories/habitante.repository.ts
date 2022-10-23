import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Habitante, HabitanteRelations, Factura, Transaccion, Propietario} from '../models';
import {FacturaRepository} from './factura.repository';
import {TransaccionRepository} from './transaccion.repository';
import {PropietarioRepository} from './propietario.repository';

export class HabitanteRepository extends DefaultCrudRepository<
  Habitante,
  typeof Habitante.prototype.id,
  HabitanteRelations
> {

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Habitante.prototype.id>;

  public readonly transaccions: HasManyRepositoryFactory<Transaccion, typeof Habitante.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Habitante.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(Habitante, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.transaccions = this.createHasManyRepositoryFactoryFor('transaccions', transaccionRepositoryGetter,);
    this.registerInclusionResolver('transaccions', this.transaccions.inclusionResolver);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
  }
}
