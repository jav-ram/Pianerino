import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AnadirProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnadirProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AnadirProvider Provider');
  }

  public ree(s:string){
    console.log(s);
  }

}
