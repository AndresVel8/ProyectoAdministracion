import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Seccion, SeccionRelations, Inmueble, Conjunto} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {ConjuntoRepository} from './conjunto.repository';

export class SeccionRepository extends DefaultCrudRepository<
  Seccion,
  typeof Seccion.prototype.id,
  SeccionRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Seccion.prototype.id>;

  public readonly conjunto: BelongsToAccessor<Conjunto, typeof Seccion.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(Seccion, dataSource);
    this.conjunto = this.createBelongsToAccessorFor('conjunto', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjunto', this.conjunto.inclusionResolver);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
