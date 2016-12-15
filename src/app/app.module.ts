import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { ChecklistPage } from '../pages/checklist/checklist';
import {NotificacionesPage} from "../pages/notificaciones/notificaciones";

import { Datos } from '../providers/datos';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    ChecklistPage,
    NotificacionesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    ChecklistPage,
    NotificacionesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage,Datos]
})
export class AppModule {}
