import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'striphtml',
  pure: false
})
export class StriphtmlPipe implements PipeTransform {

  transform(value: string): any {
    return value.replace(/<.*?>/g, ''); // replace tags
}

}
