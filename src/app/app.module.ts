import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { ChecklistPage } from '../pages/checklist/checklist';
import { NotificacionesPage } from "../pages/notificaciones/notificaciones";
import { PopoverHomePage } from '../pages/popover-home/popover-home';

import { Datos } from '../providers/datos';
import { Storage } from '@ionic/storage';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    ChecklistPage,
    NotificacionesPage,
    PopoverHomePage
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
    NotificacionesPage,
    PopoverHomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage,Datos]
})
export class AppModule {}
