import { Directive, Input, ElementRef } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Directive({
  selector: '[permission]'
})
export class PermissionDirective {
  @Input() public permission: string;

  constructor(
    private shared: SharedService,
    private el: ElementRef
    ) {}

  ngAfterViewInit(): void {
    if(!this.shared.isRoutePermitted(this.permission)) this.hide();
  }

  hide(){
    this.el.nativeElement.style.display = 'none';
  }

}
