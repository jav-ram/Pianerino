import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';
import { Leccion } from '../../interfaces/interfaces';
import { NavController, LoadingController, ToastController, AlertController } from 'ionic-angular';

/*
  Generated class for the AnadirProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnadirProvider {
  private leccionCollection: AngularFirestoreCollection<Leccion>; //Firestore collection
  private lecciones: Observable<Leccion[]>; // read collection
  private user: firebase.User;
  public userDB: any;
  public notas: any;

  constructor(public http: HttpClient, public afs: AngularFirestore, private Loading: LoadingController, private alert: AlertController) {

    console.log('Hello AnadirProvider Provider');
  }

  public anadirLeccion(leccionC:string, no:string){

    let loading = this.Loading.create({content : "Guardando, por favor espere..."});
    loading.present();

    this.leccionCollection = this.afs.collection('Lecciones');
    this.leccionCollection.add({
    leccion: {contenido: leccionC},
    color: "#00b0ff",
    descripcion: "Leccion añadida por: ",
    dificultad: 5,
    imagen: "https://firebasestorage.googleapis.com/v0/b/pianerino.appspot.com/o/Iconos%2FLecciones%2F3_teclas.png?alt=media&token=74dfa35e-98d0-4c0f-b4b5-e3b115d6d97b",
    nombre: no
    })
    .then( (result) => {
        console.log("Document addded with id >>> ", result.id);
        loading.dismiss();
    })
    .catch( (error) => {
        console.error("Error adding document: ", error);
        let alert = this.alert.create({
          title: 'Error',
          subTitle: 'Ops, algo salio mal, intenta de nuevo',
          buttons: ['OK']
        });
        alert.present();
    });
  }

}
