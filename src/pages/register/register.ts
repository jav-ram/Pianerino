import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage, LoadingController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsersProvider } from '../../providers/users/users';
import { Usuario } from '../../interfaces/interfaces';
import { Observable } from 'rxjs/Observable';
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '' };
  usuario = {
    apellido: '',
    contraseña: '',
    correo: '',
    nombre: '',
    puntos: 0,
    tipoUsuario: 0
  }
  password: string;
  nombreUsuario: string;
  userCollection: AngularFirestoreCollection<Usuario>;
  users: Observable<Usuario[]>;

  constructor(private nav: NavController, private auth: UsersProvider,
    private alertCtrl: AlertController, private afs: AngularFirestore,
    private Loading: LoadingController
  ) { }

  ionViewWillEnter(){

  }

  register() {
    let loading = this.Loading.create({content : "Creando su cuenta, por favor espere..."});
    loading.present();
    this.auth.register(this.registerCredentials).then(success => {
      if (this.registerCredentials.password!=this.password){
        this.showPopup("Error", "No es la misma contraseña");
        loading.dismiss();
      } else {
        if (success) {
          this.createSuccess = true;

          //guardar en base de datos
          this.usuario.correo = this.registerCredentials.email;
          this.usuario.contraseña = this.registerCredentials.password;
          this.usuario.puntos = 0;
          this.usuario.tipoUsuario = 0;
          console.log(this.usuario)
          this.afs.collection('Usuarios').doc(this.usuario.correo)
            .set(this.usuario)
            .then(() => {
              loading.dismiss();
              this.nav.pop();
            });
        } else {
          this.showPopup("Error", "Hubo problema creando la cuenta.");
          loading.dismiss();
        }
      }

    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK'
        }
      ]
    });
    alert.present();
  }
}
