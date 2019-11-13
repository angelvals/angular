import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  stepValue = 0;
  maxValue = 3;

  constructor() { }

  ngOnInit() {
  }

  nextStep() {
    if (this.stepValue > this.maxValue) {
      return false;
    }
    this.stepValue++;
  }

  prevStep() {
    if (this.stepValue <= 0) {
      return false;
    }
    this.stepValue--;
  }

}
