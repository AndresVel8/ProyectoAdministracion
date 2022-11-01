import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, RedirectRoute, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutentificacionService} from '../services';

export class EstrategiaPropietario implements AuthenticationStrategy {
  name: string = 'propi';
  constructor(
    @service(AutentificacionService)
    public serviceAutenticacion: AutentificacionService
  ) { }

  async authenticate(request: Request): Promise<UserProfile | RedirectRoute | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.serviceAutenticacion.validarTokenJWT(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      } else {
        throw new HttpErrors[403]('token no valido');
      }
    } else {
      throw new HttpErrors[401]('no se a detectado el token de la solicitud');
    }

  }


}

