import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimStr'
})
export class TrimStrPipe implements PipeTransform {

  transform(value: string, length: number): any {
    if(value.length > length){
      return value.slice(0, length) + "..";
    }
    return value;
  }

}
