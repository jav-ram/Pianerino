import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public userService: UsersProvider) {

  }

  sendId(){
    let userId = document.getElementById("UsuarioId");
    this.userService.getUser(parseInt(userId.value));
  }

}
