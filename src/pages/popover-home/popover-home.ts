import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the PopoverHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'popover-home.html'
})
export class PopoverHomePage {

  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    // 'white': {
    //   'bg': 'rgb(255, 255, 255)',
    //   'fg': 'rgb(0, 0, 0)'
    // },
    // 'tan': {
    //   'bg': 'rgb(249, 241, 228)',
    //   'fg': 'rgb(0, 0, 0)'
    // },
    // 'grey': {
    //   'bg': 'rgb(76, 75, 80)',
    //   'fg': 'rgb(255, 255, 255)'
    // },
    // 'black': {
    //   'bg': 'rgb(0, 0, 0)',
    //   'fg': 'rgb(255, 255, 255)'
    // }

    'yellow': {
      'bg': '#FFF0AA',
      'fg': 'rgb(0, 0, 0)'
    },
    'green': {
      'bg': '#B0E57C',
      'fg': 'rgb(0, 0, 0)'
    },
    'red': {
      'bg': '#FFAEAE',
      'fg': 'rgb(0, 0, 0)'
    },
    'blue': {
      'bg': '#B4D8E7',
      'fg': 'rgb(0, 0, 0)'
    }
  };

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {
    if (this.navParams.data) {
      this.contentEle = this.navParams.data.contentEle;
      this.textEle = this.navParams.data.textEle;

      this.background = this.getColorName(this.contentEle.style.backgroundColor);
      this.setFontFamily();
    }
  }

  getColorName(background) {
    let colorName = 'yellow';

    if (!background) return 'yellow';

    for (var key in this.colors) {
      if (this.colors[key].bg == background) {
        colorName = key;
      }
    }

    return colorName;
  }

  setFontFamily() {
    if (this.textEle.style.fontFamily) {
      this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
    }
  }

  changeBackground(color) {
    this.background = color;
    this.contentEle.style.backgroundColor = this.colors[color].bg;
    this.textEle.style.color = this.colors[color].fg;
  }

  changeFontSize(direction) {
    this.textEle.style.fontSize = direction;
  }

  changeFontFamily() {
    if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  }

}
