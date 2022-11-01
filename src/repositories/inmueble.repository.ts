import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Seccion, Propietario} from '../models';
import {SeccionRepository} from './seccion.repository';
import {PropietarioRepository} from './propietario.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly seccion: BelongsToAccessor<Seccion, typeof Inmueble.prototype.id>;

  public readonly propietario: BelongsToAccessor<Propietario, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('SeccionRepository') protected seccionRepositoryGetter: Getter<SeccionRepository>, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>,
  ) {
    super(Inmueble, dataSource);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
    this.seccion = this.createBelongsToAccessorFor('seccion', seccionRepositoryGetter,);
    this.registerInclusionResolver('seccion', this.seccion.inclusionResolver);
  }
}
