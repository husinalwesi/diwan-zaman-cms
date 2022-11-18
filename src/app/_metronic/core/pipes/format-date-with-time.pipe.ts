import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateWithTime'
})
export class FormatDateWithTimePipe implements PipeTransform {

  transform(value: string): any {
    if(!value) return "---";
    let temp_arr = value.split("-");
    let year = temp_arr[0];
    let month = temp_arr[1];
    let day = temp_arr[2].substring(0, 2);
    let time = temp_arr[2].split("T")[1].substring(0, 5);
    let separator = "-";
    return year + separator + month + separator + day + " " + time;
  }

}
