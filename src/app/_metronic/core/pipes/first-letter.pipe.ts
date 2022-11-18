// Angular
import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns only first letter of string
 */
@Pipe({
  name: 'firstLetter',
})
export class FirstLetterPipe implements PipeTransform {
  /**
   * Transform
   *
   * @param value: any
   * @param args: any
   */
  transform(value: any, args?: any): any {
    if(value == undefined)
      return;
    let separator = "";
    let splitted_str = value
      .split(' ')
      .map((n) => n[0])
      .join('');
      // 
      if(splitted_str.length > 2){
        return splitted_str[0] + separator + splitted_str[splitted_str.length - 1];
        // alert();
      }else{
        return splitted_str;
      }
  }
}
