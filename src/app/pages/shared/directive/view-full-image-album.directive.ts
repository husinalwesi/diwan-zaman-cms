import { Directive, HostListener, Input } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Directive({
  selector: '[appViewFullImageAlbum]'
})
export class ViewFullImageAlbumDirective {
  @Input() images: any;

  constructor(private shared: SharedService) {}

  @HostListener('click', ['$event.target']) onClick(event) {
    this.shared.showImageFullViewAlbum(this.images);
  }

}
