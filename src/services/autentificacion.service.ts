import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {llaves} from '../Config/llaves';
import {Propietario} from '../models';
import {PropietarioRepository} from '../repositories';
const cryptoJs = require('crypto-js');
const generador = require('password-generator');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutentificacionService {
  constructor(
    @repository(PropietarioRepository)
    public propietarioRepository: PropietarioRepository
  ) { }

  ocultarClave(clave: string): string {
    let claveEncriptada = cryptoJs.MD5(clave).toString();
    return claveEncriptada;
  }

  generarClave() {

    let clave = generador(10, false)
    return this.ocultarClave(clave);
  }



  validarAcceso(usuario: string, contrasenia: string) {
    try {
      let prop = this.propietarioRepository.findOne({
        where: {
          correo: usuario,
          contrasena: contrasenia
        }


      });
      if (prop)
        return prop;

      return false;

    } catch (error) {
      return false;
    }
  }


  generarTokenJWT(propietario: Propietario) {
    let token = jwt.sign({
      data: {
        Id: propietario.id,
        correo: propietario.correo,
        nombres: `${propietario.primer_nombre} ${propietario.primer_apellido}`
      }
    },
      llaves.claveJwT
    );
    return token;
  }

  validarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, llaves.claveJwT)
      return datos;
    } catch (error) {
      return false;
    }
  }

}
