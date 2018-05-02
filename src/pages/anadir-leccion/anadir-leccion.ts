import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var dcodeIO: any;
/**
 * Generated class for the AnadirLeccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anadir-leccion',
  templateUrl: 'anadir-leccion.html',
})
export class AnadirLeccionPage {
  // public maestro: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnadirLeccionPage');
  }

}
