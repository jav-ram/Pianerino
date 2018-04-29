import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {
  currentUser: User;


  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Porfavor ingrese sus datos");
    } else {
      return ;
    }
  }

}
