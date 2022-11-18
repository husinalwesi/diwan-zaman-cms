import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDashs'
})
export class RemoveDashsPipe implements PipeTransform {

  transform(value: string): string {
    return this.replaceAll(value, "-", " ");
  }

  replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
  }


}