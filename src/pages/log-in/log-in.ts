import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { HomePage } from '../home/home';
/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  loginData:any = {correo:'', contrasena:''};

  constructor(public navCtrl: NavController,private auth: UsersProvider) {

  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  IniciarSesion(){

    let credentials = {
      email: this.loginData.correo,
      password: this.loginData.contrasena
    };
    console.log(credentials);
    this.auth.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(HomePage),
        error => console.log("error")
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }
}
