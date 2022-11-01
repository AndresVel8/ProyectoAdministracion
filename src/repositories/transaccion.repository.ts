import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Transaccion, TransaccionRelations, FacturaTransaccion, Propietario, Habitante} from '../models';
import {FacturaTransaccionRepository} from './factura-transaccion.repository';
import {PropietarioRepository} from './propietario.repository';
import {HabitanteRepository} from './habitante.repository';

export class TransaccionRepository extends DefaultCrudRepository<
  Transaccion,
  typeof Transaccion.prototype.id,
  TransaccionRelations
> {

  public readonly facturaTransaccions: HasManyRepositoryFactory<FacturaTransaccion, typeof Transaccion.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Transaccion.prototype.id>;

  public readonly habitante: BelongsToAccessor<Habitante, typeof Transaccion.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('FacturaTransaccionRepository') protected facturaTransaccionRepositoryGetter: Getter<FacturaTransaccionRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('HabitanteRepository') protected habitanteRepositoryGetter: Getter<HabitanteRepository>,
  ) {
    super(Transaccion, dataSource);
    this.habitante = this.createBelongsToAccessorFor('habitante', habitanteRepositoryGetter,);
    this.registerInclusionResolver('habitante', this.habitante.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.facturaTransaccions = this.createHasManyRepositoryFactoryFor('facturaTransaccions', facturaTransaccionRepositoryGetter,);
    this.registerInclusionResolver('facturaTransaccions', this.facturaTransaccions.inclusionResolver);
  }
}
