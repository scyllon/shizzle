import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expandDigit'
})
export class ExpandDigitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value < 10 ? '0' : '') + value
  }

}
