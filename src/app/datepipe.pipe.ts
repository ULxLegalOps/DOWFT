import { Pipe, PipeTransform } from '@angular/core';
 import * as _ from 'lodash'; 
//declare var _: any;
@Pipe({
  name: 'datepipe',
  pure: false
})
export class DatepipePipe implements PipeTransform {
  transform(value: string): any {
    return value.slice(0,10); // replace tags
}

}
