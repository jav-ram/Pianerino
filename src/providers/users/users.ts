import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class UsersProvider {

  data: any;

  constructor(public http: Http) {
    this.data = null;
  }

  //Aqui hay que hacer la llamada

  //Obtener usuario
  getUser(usuario: string){
    let headers = new Headers();
    let index = {'usuario': usuario};
    console.log(index);
    headers.append('Content-Type', 'application/json');
    this.http.get('http://localhost:8080/usuario/', {params: index})
      .subscribe(res => {

      })
  }

  //Verificar usuario LOG IN
  verificarUsuario(usuario: string, contrasena: string){
    let headers = new Headers();
    let params = {
      usuario: usuario,
      psw: contrasena
    };
    this.http.post('http://localhost:8080/usuario/', {params: params})
      .subscribe(res => {
      },
      error => {
        console.log("Problema")
      }
    );
  }



}
