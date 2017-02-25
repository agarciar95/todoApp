/**
 * Created by Usuario on 13/12/2016.
 */

import { Observable } from 'rxjs/Observable';

export class ChecklistModel{
  checklist: any;
  checklistObserver: any;
  aleatorio_global = 1;

  constructor(public title: string, public items: any[], public color: any){
    this.items = items;
    this.color = color;
    this.checklist = Observable.create(observer =>{this.checklistObserver = observer});
  }

  addItem(item):void{
    this.items.push({
      title: item,
      checked: false
    });

    this.checklistObserver.next(true);
  }

  removeItem(item):void{
    let index = this.items.indexOf(item);

    if(index > -1){
      this.items.splice(index,1);
    }

    this.checklistObserver.next(true);
  }

  renameItem(item, title):void {
    let index = this.items.indexOf(item);

    if(index > -1){
      this.items[index].title = title;
    }

    this.checklistObserver.next(true);

  }

  setTitle(title):void{
    this.title = title;
    this.checklistObserver.next(true);

  }

  setColor(color = null):void{
    if(color != null){
      this.color = color;

      this.checklistObserver.next(true);
    }else{
      let color_aleatorio = this.generarColor(this.aleatorio_global);

      this.color = color_aleatorio;
      this.checklistObserver.next(true);
    }
  }

  generarColor(number){

    let color = "yellow";
    switch (number){
      case 1:
        color = "yellow";
        this.aleatorio_global++;
        break;
      case 2:
        color = "red";
        this.aleatorio_global++;
        break;
      case 3:
        color = "blue";
        this.aleatorio_global++;
        break;
      case 4:
        color = "green";
        this.aleatorio_global = 1;
        break;
    }

    return color;
  }

  toggleItem(item):void{
    item.checked = !item.checked;
    this.checklistObserver.next(true);
  }
}
