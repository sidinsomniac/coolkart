import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeString'
})
export class LocaleStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.toLocaleString('en-IN');
  }

}
