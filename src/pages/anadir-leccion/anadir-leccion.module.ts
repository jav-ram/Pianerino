import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnadirLeccionPage } from './anadir-leccion'

@NgModule({
  declarations: [
    AnadirLeccionPage,
  ],
  imports: [
    IonicPageModule.forChild(AnadirLeccionPage),
  ],
})
export class AnadirLeccionPageModule {
  ionViewWillEnter(){

  }
}
