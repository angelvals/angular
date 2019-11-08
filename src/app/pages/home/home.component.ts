import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sliderValue = 200;
  minValue = 200;
  maxValue = 700;

  constructor() { }

  ngOnInit() {
  }

  updateSlider($event) {
    this.sliderValue = $event.value;
  }

}
