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

  getUser(id: number){
    let headers = new Headers();
    let index = {"id":id};
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:8080/a', index, {headers: headers})
      .subscribe(res => {
        console.log(JSON.parse(res._body).id);
      })
  }

}
