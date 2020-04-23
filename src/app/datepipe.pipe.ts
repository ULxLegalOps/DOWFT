import { Pipe, PipeTransform } from '@angular/core';
 import * as _ from 'lodash'; 
//declare var _: any;
@Pipe({
  name: 'datepipe',
  pure: false
})
export class DatepipePipe implements PipeTransform {

 
  transform(value: any): any{
    if(value!== undefined && value!== null){
        return _.uniqBy(value, 'name');
    }
    return value;
}

}
