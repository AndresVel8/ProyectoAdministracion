import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Inmueble} from '../models';
import {InmuebleRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class InmuebleService {
  constructor(@repository(InmuebleRepository)
  public inmuebleRepository: InmuebleRepository) { }


  getInmueblesPorSubPiso(): Promise<Inmueble[]> {
    let inmueble = this.inmuebleRepository.find({
      where: {
        sub_piso: '202'
      }
    });
    return inmueble;
  }



  getInmuebleporPiso(piso: string): Promise<Inmueble[]> {
    let inmueble = this.inmuebleRepository.find({
      where: {
        piso: piso //,
        // estado: 'A'
      }
    });
    return inmueble;
  }






  /*
   * Add service methods here
   */
}
