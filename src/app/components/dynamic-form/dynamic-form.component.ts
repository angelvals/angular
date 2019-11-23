import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {

  titleValue: string;
  messageValue: string;
  optionSelectedValue: string;

  constructor() { }

  @Output()
  titleChange = new EventEmitter<string>();

  @Output()
  messageChange = new EventEmitter<string>();

  @Input()
  get title() {
    return this.titleValue;
  }

  set title(val) {
    this.titleValue = val;
    this.titleChange.emit(this.titleValue);
  }

  @Input()
  get message() {
    return this.messageValue;
  }

  set message(val) {
    this.messageValue = val;
    this.messageChange.emit(this.messageValue);
  }
}
