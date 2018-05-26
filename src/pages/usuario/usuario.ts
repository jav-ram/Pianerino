import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UsersProvider } from '../../providers/users/users';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

public users: any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private afs:AngularFirestore,
  public user: UsersProvider,
  private http: Http) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsuarioPage');
    console.log(this.user.getUser());
    this.users=this.user.getUser();
    console.log(this.users);
    //halp();
  }

  public name(){
  	return this.user.getUser().nombre;
  }

  public apellido(){
  	return this.user.getUser().apellido;
  }

  public puntos(){
  	return this.user.getUser().puntos;
  }

  public tipo(){

  	return this.user.getUser().tipoUsuario.tipo;
  }

  public correo(){
  	return this.user.getUser().correo;
  }

  public usuario(){
    return this.user.getUser().usuario;
  }

}
