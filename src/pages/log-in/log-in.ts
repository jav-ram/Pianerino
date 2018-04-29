import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Http, Headers, RequestOptions } from '@angular/http';
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

  loading: any;
  loginData:any = {usuario:'', contrasena:''};
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public loadingCtrl: LoadingController, private toastCtrl: ToastController,
  public userService: UsersProvider, private http: Http,
  private alertCtrl: AlertController) { }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  IniciarSesion(){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');
    let options = new RequestOptions({ headers:headers});
    //Mostrar el loading
    this.loading = this.loadingCtrl.create({
      content: 'Autenticando...'
    });
    this.loading.present();
    console.log(this.loginData);
    //Hacer request
    // /usuario/verificar
    this.http.post('http://localhost:8080/usuario/verificar',this.loginData, options)
      .map(res => res.json())
      .subscribe(data => {
        if (data.verificado){
          //ir a home
          this.navCtrl.push(HomePage);
        } else {
          let alert = this.alertCtrl.create({
            title: 'Error de auntentificación',
            subTitle: 'Usuario o contraseña incorrecta',
            buttons: ['Cerrar']
          });
          alert.present();
        }
        this.loading.dismiss();
      });
    //Pasar a siguiente page
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

}
