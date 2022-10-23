import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Contador, ContadorRelations, Conjunto} from '../models';
import {ConjuntoRepository} from './conjunto.repository';

export class ContadorRepository extends DefaultCrudRepository<
  Contador,
  typeof Contador.prototype.id,
  ContadorRelations
> {

  public readonly conjuntos: HasManyRepositoryFactory<Conjunto, typeof Contador.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>,
  ) {
    super(Contador, dataSource);
    this.conjuntos = this.createHasManyRepositoryFactoryFor('conjuntos', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjuntos', this.conjuntos.inclusionResolver);
  }
}
