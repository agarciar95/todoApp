import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import {NotificacionesPage} from "../notificaciones/notificaciones";

/*
  Generated class for the Checklist page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checklist',
  templateUrl: 'checklist.html'
})
export class ChecklistPage {

  checklist: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toast: ToastController) {
    this.checklist = this.navParams.get('checklist');
  }

  ionViewDidLoad() {
    console.log('Hello ChecklistPage Page');
  }

  presentToast(message) {
    let toast = this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  addItem():void{
    let prompt = this.alertCtrl.create({
        title:'Agregar Tarea',
        message: 'Anota la tarea a realizar',
        inputs: [
          {name:'name'}
        ],
        buttons: [
          {text: 'Cancelar'},
          {
            text: 'Agregar',
            handler: data =>{
              this.checklist.addItem(data.name);
              this.presentToast("Tarea agregada!");
            }
          }
        ]
    });

    prompt.present();
  }

  toggleItem(item):void{
    this.checklist.toggleItem(item);
    (item.checked) ? this.presentToast("Tarea completada!") : '';
  }

  removeItem(item):void{
    this.checklist.removeItem(item);
    this.presentToast("Tarea removida!");
  }

  renameItem(item):void{
    let prompt = this.alertCtrl.create({
      title: 'Renombrar tarea',
      message: 'Introduce nuevo nombre para la tarea',
      inputs: [{name: 'name'}],
      buttons: [
        { text: 'Cancelar' },
        {
          text: 'Actualizar',
          handler: data => {
            this.checklist.renameItem(item,data.name);
            this.presentToast("Tarea renombrada!");
          }
        }
      ]
    });

    prompt.present();
  }

  uncheckItems():void{
    // for(let item of this.checklist.items){
    //   if(item.checked){
    //     console.log("item-checked:");
    //   }else{
    //     console.log("item-no-checked:");
    //   }
    //
    // }
    this.checklist.items.forEach((item)=>{
      if(item.checked){
        this.checklist.toggleItem(item);
        this.presentToast("Tareas Desmarcadas!");
      }
    })
  }

  scheduleAlarm(item):void{
    // let prompt = this.alertCtrl.create({
    //   title:'Agregar Alarma',
    //   message: 'Selecciona la fecha y tiempo',
    //   inputs: [
    //     {
    //       name:'date',
    //       type:'datetime-local'
    //     }
    //   ],
    //   buttons: [
    //     {text: 'Cancelar'},
    //     {
    //       text: 'Agregar',
    //       handler: data =>{
    //         console.log(data.date);
    //         // this.checklist.addItem(data.name);
    //         // this.presentToast("Tarea agregada!");
    //       }
    //     }
    //   ]
    // });
    //
    // prompt.present();

    this.navCtrl.push(NotificacionesPage,{'item':item});
  }

}
