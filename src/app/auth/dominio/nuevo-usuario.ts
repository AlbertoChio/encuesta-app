import { required } from '@rxweb/reactive-form-validators';

export class NuevoUsuario {
  nombre: string;
  @required()
  nombreUsuario: string;
  email: string;
  @required()
  password: string;
  constructor( nombreUsuario?: string, password?: string, email?: string,nombre?: string) {
    this.nombre = nombre;
    this.nombreUsuario = nombreUsuario;
    this.email = email;
    this.password = password;
  }
}
