import { Component } from '@angular/core';

import { NavController, AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';

import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../models/checklist-model';
import { Datos } from '../../providers/datos';
import { Keyboard } from 'ionic-native';
import { IntroPage } from '../intro/intro';

import {LocalNotifications} from 'ionic-native';
import {NotificacionesPage} from "../notificaciones/notificaciones";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checklists: ChecklistModel[] = [];

  constructor(public navCtrl: NavController, public dataService: Datos, public alertCtrl: AlertController,public storage: Storage, public platform: Platform, public toast: ToastController) {
    this.navCtrl = navCtrl;
    this.dataService = dataService;
  }

  ionViewDidLoad(){
    this.platform.ready().then(()=>{
      //para redireccionar por primera vez al tutorial
      this.storage.get('introShown').then((result) => {
        if(!result){
          this.storage.set('introShown',true);
          this.navCtrl.setRoot(IntroPage);
        }
      });

      this.dataService.getData().then((checklists) =>{
        let savedChecklists: any = false;

        if(typeof (checklists) != "undefined"){
          savedChecklists = JSON.parse(checklists);
        }

        if(savedChecklists){
          savedChecklists.forEach((savedChecklist) =>{
            let loadChecklist = new ChecklistModel(savedChecklist.title,savedChecklist.items);
            this.checklists.push(loadChecklist);

            loadChecklist.checklist.subscribe(update => {
              this.save();
            });
          })
        }
      });
    });
  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  addChecklist():void{
    let prompt = this.alertCtrl.create({
      title: 'Nueva Lista',
      message: 'Ingresa el nombre de tu lista aqui abajo',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Guardar',
          handler: data =>{
            let newChecklist = new ChecklistModel(data.name,[]);
            this.checklists.push(newChecklist);

            newChecklist.checklist.subscribe(update => {this.save()});
            this.save();
            this.presentToast("Lista agregada!");
          }
        }
      ]
    });

    // prompt.addInput({
    //   name: 'color',
    //   type: 'radio',
    //   label: 'Azul',
    //   value: '1',
    //   checked: true
    // });
    //
    // prompt.addInput({
    //   name: 'color',
    //   type: 'radio',
    //   label: 'Amarillo',
    //   value: '2'
    // });
    //
    // prompt.addInput({
    //   name: 'color',
    //   type: 'radio',
    //   label: 'Rojo',
    //   value: '3'
    // });
    //
    // prompt.addInput({
    //   name: 'color',
    //   type: 'radio',
    //   label: 'Verde',
    //   value: '4'
    // });

    prompt.present();
  }

  renameChecklist(checklist):void{
    let prompt = this.alertCtrl.create({
      title: 'Editar lista',
      message: 'Renombra tu lista',
      inputs: [
        { name: 'name' }
      ],
      buttons: [
        {text: 'Cancelar'},
        {
          text: 'Actualizar',
          handler: data =>{
            let index = this.checklists.indexOf(checklist);

            if(index > -1){
              this.checklists[index].setTitle(data.name);
              this.save();
              this.presentToast("Lista Renombrada!");
            }
          }
        }
      ]
    });

    prompt.present();
  }

  viewChecklist(checklist):void{
    this.navCtrl.push(ChecklistPage,{checklist: checklist});
  }

  removeChecklist(checklist):void{
    let index = this.checklists.indexOf(checklist);

    if(index > -1){
      this.checklists.splice(index,1);
      this.save();
      this.presentToast("Lista removida!");
    }
  }

  save():void{
    Keyboard.close();
    this.dataService.save(this.checklists);

  }

  public schedule() {
    // LocalNotifications.schedule({
    //   title: "Test Title",
    //   text: "Delayed Notification",
    //   at: new Date(new Date().getTime() + 5 * 1000),
    //   sound: null
    // });
    this.navCtrl.push(NotificacionesPage);
  }

}
