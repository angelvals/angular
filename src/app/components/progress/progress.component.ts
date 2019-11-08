import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  @Input() stepValue: number;

  steps = [
    {
      value: 0,
      desc: 'Shipping Information'
    },
    {
      value: 1,
      desc: 'Billing Information'
    },
    {
      value: 2,
      desc: 'Payment Details'
    },
    {
      value: 3,
      desc: 'Review & Place Order'
  }];

  constructor() { }

  ngOnInit() {
  }

}
