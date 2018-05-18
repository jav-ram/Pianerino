import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, private auth: UsersProvider,
    private Loading: LoadingController, private alert: AlertController) {

  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  IniciarSesion(){
    let loading = this.Loading.create({content : "Iniciando sesion, por favor espere..."});
    loading.present();


    let credentials = {
      email: this.loginData.correo,
      password: this.loginData.contrasena
    };
    console.log(credentials);
    this.auth.signInWithEmail(credentials)
      .then(
        () => {
          this.navCtrl.setRoot(HomePage);
        },
        (error) => {
          let alert = this.alert.create({
            title: 'Error',
            subTitle: 'Correo o Contraseña incorrectas, vuelva a intentarlo',
            buttons: ['OK']
          });
          alert.present();
          console.log("error")
        }
      ).then(()=>{
        loading.dismiss();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }
}
