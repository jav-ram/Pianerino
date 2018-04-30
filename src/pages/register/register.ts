import { Component } from '@angular/core';
import { NavController, AlertController, IonicPage } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsersProvider } from '../../providers/users/users';
import { Usuario } from '../../interfaces/usuario'

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
  nombreUsuario: string;
  userCollection: AngularFirestoreCollection<Usuario>;
  users: Observable<Usuario[]>;

  constructor(private nav: NavController, private auth: UsersProvider, private alertCtrl: AlertController, private afs: AngularFirestore) { }

  ionViewWillEnter(){

  }

  register() {
    this.auth.register(this.registerCredentials).then(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Exito", "Cuenta creada");
        //guardar en base de datos
        this.usuario.correo = this.registerCredentials.email;
        this.usuario.contraseña = this.registerCredentials.password;
        this.usuario.puntos = 0;
        this.usuario.tipoUsuario = 0;
        console.log(this.usuario)
        this.afs.collection('Usuarios').doc(this.nombreUsuario)
          .set(this.usuario)
          .then(function (docRef) {
              console.log(docRef)
          });
      } else {
        this.showPopup("Error", "Hubo problema creando la cuenta.");
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
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
}
