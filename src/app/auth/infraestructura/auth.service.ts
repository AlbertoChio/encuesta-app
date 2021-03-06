import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NuevoUsuario } from '../dominio/nuevo-usuario';
import { LoginUsuario } from '../dominio/login-usuario';
import { JwtDTO } from '../dominio/jwt-dto';
import { NuevosUsuarios } from '../dominio/nuevos-usuarios';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'https://aws-app.excellentraining.com/auth/';

  constructor(private httpClient: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }

  public nuevos(nuevosUsuarios: NuevosUsuarios): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevos', nuevosUsuarios);
  }
}
