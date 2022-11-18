import { Router } from '@angular/router';
import { SharedService } from './../shared/services/shared.service';
import { ApisService } from './../shared/services/apis.service';
import { AlertService } from './../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-slot',
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss']
})
export class TimeSlotComponent implements OnInit {
  @Input() response;
  @Input() id;
  @Input() type;
  @Input() isViewPage: boolean;
  // iteration: any = [];
  constructor(
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private api: ApisService,
    private shared: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isViewPage = typeof this.isViewPage !== 'undefined' ? this.isViewPage : false;
  }

  deleteTimeSlot(id){
    this.spinner.show();
    this.api.deleteTimeSlot(id).subscribe(
      (res) => {
        this.spinner.hide();
        let redirectRoute = this.type == "Dealership" ? 'dealership-centre-edit' : 'local-center-service-edit'
        this.alert.success({title: "Time slot deleted successfully."});
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate([`/${redirectRoute}/${this.id}`]));
      },
      (err) => {          
        this.spinner.hide();
        this.alert.error({title: err.error.data});
      }
    ); 
  }

}
