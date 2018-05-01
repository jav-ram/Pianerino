import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeccionPage } from './leccion';

@NgModule({
  declarations: [
    LeccionPage,
  ],
  imports: [
    IonicPageModule.forChild(LeccionPage),
  ],
})
export class LeccionPageModule {}
