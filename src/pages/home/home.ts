import {Component, ViewChild, ElementRef, ContentChildren, QueryList, AfterContentInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, AlertController, Platform, PopoverController, ToastController } from 'ionic-angular';
import { Keyboard } from 'ionic-native';

import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../models/checklist-model';
import { Datos } from '../../providers/datos';
import { IntroPage } from '../intro/intro';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements AfterContentInit{

  checklists: ChecklistModel[] = [];

  constructor(public navCtrl: NavController, public dataService: Datos, public alertCtrl: AlertController,public storage: Storage, public platform: Platform, public toast: ToastController, private popoverCtrl: PopoverController) {
    this.navCtrl = navCtrl;
    this.dataService = dataService;

  }

  ngAfterContentInit() {
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
            let loadChecklist = new ChecklistModel(savedChecklist.title,savedChecklist.items,savedChecklist.color);
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
            let color = "yellow";
            let newChecklist = new ChecklistModel(data.name,[],color);
            this.checklists.push(newChecklist);

            newChecklist.checklist.subscribe(update => {this.save()});
            this.save();
            this.presentToast("Lista agregada!");
          }
        }
      ]
    });

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

    let prompt = this.alertCtrl.create({
      title: 'Eliminar lista',
      message: '¿Desea eliminar '+checklist.title+'?',
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Eliminar',
          handler: ()=>{
            let index = this.checklists.indexOf(checklist);

            if(index > -1){
              this.checklists.splice(index,1);
              this.save();
              this.presentToast("Lista removida!");
            }
          }
        }
      ]
    });

    prompt.present();
  }

  addColor(checklist){
    let index = this.checklists.indexOf(checklist);

    if(index > -1){
      this.checklists[index].setColor();
      this.save();
      this.presentToast("Color agregado!");
    }
  }

  save():void{
    Keyboard.close();
    this.dataService.save(this.checklists);

  }
}
