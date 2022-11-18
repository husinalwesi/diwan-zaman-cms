import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeUnderScore'
})
export class RemoveUnderScorePipe implements PipeTransform {

  transform(value): any {
    if(value){
      if(value.indexOf("_") !== -1) return value.replace("_"," ");
    }
    return value;
  }

}
