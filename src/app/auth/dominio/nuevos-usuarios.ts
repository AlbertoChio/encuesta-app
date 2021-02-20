import { propArray, required } from '@rxweb/reactive-form-validators';
import { NuevoUsuario } from './nuevo-usuario';

export class NuevosUsuarios {

  @propArray(NuevoUsuario)
  usuarios?: NuevoUsuario[];

  constructor() {
    this.usuarios=[new NuevoUsuario()];
  }
}
