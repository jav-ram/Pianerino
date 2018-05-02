import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../interfaces/usuario'
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: '/home.html'
})
export class HomePage {

  userCollection: AngularFirestoreCollection<Usuario>;
  users: Observable<Usuario[]>;
  item: Usuario[];
  leccion_url: string = '/leccion.html';

  constructor(public navCtrl: NavController, private afs: AngularFirestore,
    public popOut: AlertController, private http: Http) {

  }

  ionViewWillEnter(){

    this.userCollection = this.afs.collection('Lecciones');
    this.users = this.userCollection.valueChanges()

    this.userCollection.snapshotChanges().subscribe((usuarios) => {
      usuarios.forEach(usuario => {
        //console.log(usuario.payload.doc._document.data.internalValue.get('tipoUsuario').internalValue)
      });
    })
  }

  irLeccion(id: any){

  }

  Info(titulo: string, description: string){
    let alert = this.popOut.create({
      title: titulo,
      subTitle: description,
      buttons: ['OK']
    });
    alert.present();
  }

}
