import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LeccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leccion',
  templateUrl: 'leccion.html',
})
export class LeccionPage {

  html: string;
  hola: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.html = navParams.get('html')
    this.hola = '<h1>asdasdasdasd</h1>'
  }

  ionViewDidLoad() {
    console.log(this.html)
    console.log('ionViewDidLoad LeccionPage');
  }

}
