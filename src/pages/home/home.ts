import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Leccion, Usuario } from '../../interfaces/interfaces'
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: '/home.html'
})
export class HomePage {

  leccionCollection: AngularFirestoreCollection<Leccion>;
  users: Observable<Leccion[]>;

  item: Leccion[];
  leccion_url: string = '/leccion.html';
  maestro_url: string = '/maestro.html';
  usuario: any;

  constructor(public navCtrl: NavController, private afs: AngularFirestore,
    public popOut: AlertController, private http: Http, public user: UsersProvider) {

  }

  ionViewDidEnter(){
    this.leccionCollection = this.afs.collection('Lecciones');
    this.users = this.leccionCollection.valueChanges();

    this.leccionCollection.snapshotChanges().subscribe((Leccions) => {
      Leccions.forEach(Leccion => {
        //console.log(Leccion.payload.doc._document.data.internalValue.get('tipoLeccion').internalValue)
      });
    })
  }

  onLoad(){
    console.log(this.user.getUser());
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
