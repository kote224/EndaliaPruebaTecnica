import { loginResponse } from './login.mock';
import { Injectable } from '@angular/core';
import { Login } from '../models/Login';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public login?: Login;
  public loginNull: Login = {
    name: '',
    id: '',
    clientRole: '',
  };

  public userNotFound: boolean = false;
  getUserById(user: any, password: any) {
    //aquí deberia ir la logica con la llamada a la BD/keycloak/etc... Fuerzo un mock devolviendo datos si el user y pass estuvieran en la bd por si se quisiera poner el nombre en el header del usuario logeado.
    this.login = loginResponse?.find((employee) => {
      const name = employee.name?.toLowerCase() || '';
      if (name === user.toLowerCase()) {
        this.userNotFound = false;
        return name === user.toLowerCase();
      } else {
        this.userNotFound = true;
        return null;
      }
    });

    //Ya que el find devuelve undefined cuando no encuentra nada, forzamos que devuelva una respuesta vacia
    if (this.userNotFound) {
      return this.loginNull;
    } else {
      return this.login;
    }
  }
}
