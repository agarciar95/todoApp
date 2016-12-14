import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Datos provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Datos {

  constructor(public storage: Storage) {
    console.log('Hello Datos Provider');
  }

  getData(): Promise<any>{
    return this.storage.get('checklists');
  }

  save(data):void{
    let saveData = [];

    data.forEach( (checklist) => {
      saveData.push({
        title: checklist.title,
        items: checklist.items
      });
    });

    let newData = JSON.stringify(saveData);
    this.storage.set('checklists',newData);
  }

}
