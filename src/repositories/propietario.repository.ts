import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Inmueble, Factura, Transaccion, Habitante} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {FacturaRepository} from './factura.repository';
import {TransaccionRepository} from './transaccion.repository';
import {HabitanteRepository} from './habitante.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.id,
  PropietarioRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Propietario.prototype.id>;

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Propietario.prototype.id>;

  public readonly transaccions: HasManyRepositoryFactory<Transaccion, typeof Propietario.prototype.id>;

  public readonly habitantes: HasManyRepositoryFactory<Habitante, typeof Propietario.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>, @repository.getter('TransaccionRepository') protected transaccionRepositoryGetter: Getter<TransaccionRepository>, @repository.getter('HabitanteRepository') protected habitanteRepositoryGetter: Getter<HabitanteRepository>,
  ) {
    super(Propietario, dataSource);
    this.habitantes = this.createHasManyRepositoryFactoryFor('habitantes', habitanteRepositoryGetter,);
    this.registerInclusionResolver('habitantes', this.habitantes.inclusionResolver);
    this.transaccions = this.createHasManyRepositoryFactoryFor('transaccions', transaccionRepositoryGetter,);
    this.registerInclusionResolver('transaccions', this.transaccions.inclusionResolver);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
