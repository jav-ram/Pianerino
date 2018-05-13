import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../interfaces/interfaces';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/



@Injectable()
export class UsersProvider {

  private usuarioCollection: AngularFirestoreCollection<Usuario>;
  private usuarios: Observable<Usuario[]>;
  private user: firebase.User;
  public userDB: any;

	constructor(public afAuth: AngularFireAuth, public afs: AngularFirestore) {
		afAuth.authState.subscribe(user => {
			this.user = user;

		});

	}

	public signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password).then(() => {

         this.usuarioCollection = this.afs.collection('Usuarios');
         this.usuarios = this.usuarioCollection.valueChanges();

         this.usuarioCollection.doc(credentials.email).ref.get().then((doc) => {
           if (doc.exists) {
               this.userDB = doc.data();
               console.log("Document data:", this.userDB);

           } else {
               console.log("No such document!");
           }

         })

       });
	}

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return;
    } else {
      return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }
  }

  public autentificar(){
    return this.user && this.user.email;
  }

  public getUser(){
    return this.userDB;
  }

}
