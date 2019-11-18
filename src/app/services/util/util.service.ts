import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  customSort(data, desc = false) {
    const orderedValues = [];
    let counter = 0;
    const maxLength = data.length;
    while (data.length > 0) {
      let index: number;
      let maxValue: any = null;
      data.forEach((item, i) => {
        if (maxValue === null || eval(`${maxValue} ${ desc ? '<' : '>'} ${item}`)) {
          maxValue = item;
          index = i;
        }
      });
      orderedValues.push(maxValue);
      data.splice(index, 1);
      // Just in case of disaster
      counter++;
      if (counter > maxLength) {
        data = [];
      }
    }
    return orderedValues;
  }
}
