import { Component } from '@angular/core';

import { NavController, AlertController, Platform } from 'ionic-angular';

import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../models/checklist-model';
import { Datos } from '../../providers/datos';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  checklists: ChecklistModel[] = [];

  constructor(public navCtrl: NavController, public dataService: Datos, public alertCtrl: AlertController, public platform: Platform) {
    this.navCtrl = navCtrl;
    this.dataService = dataService;
  }

  ionViewDidLoad(){}

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
          }
        }
      ]
    });

    prompt.present();
  }

  renameChecklist(checklist):void{

  }

  viewChecklist(checklist):void{

  }

  removeChecklist(checklist):void{

  }

  save():void{

  }

}
