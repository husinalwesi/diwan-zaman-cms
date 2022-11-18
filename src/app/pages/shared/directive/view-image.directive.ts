import { Directive, HostListener } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Directive({
  selector: '[viewFullImage]'
})
export class ViewImageDirective {

  constructor(private shared: SharedService) {
  }

  @HostListener('click', ['$event.target']) onClick(event) {
    this.shared.showImageFullView(event.src);
  }

}
