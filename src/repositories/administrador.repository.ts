import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {AdministraciondbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Conjunto, Factura} from '../models';
import {ConjuntoRepository} from './conjunto.repository';
import {FacturaRepository} from './factura.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly conjuntos: HasManyRepositoryFactory<Conjunto, typeof Administrador.prototype.id>;

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.administraciondb') dataSource: AdministraciondbDataSource, @repository.getter('ConjuntoRepository') protected conjuntoRepositoryGetter: Getter<ConjuntoRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Administrador, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
    this.conjuntos = this.createHasManyRepositoryFactoryFor('conjuntos', conjuntoRepositoryGetter,);
    this.registerInclusionResolver('conjuntos', this.conjuntos.inclusionResolver);
  }
}
