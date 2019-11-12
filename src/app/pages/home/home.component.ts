import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  data = {
    title: 'Hello',
    message: 'Hello World',
    optionSelected: 'option',
  };

  constructor() { }

  sendData() {
    console.log(this.data);
  }

}
