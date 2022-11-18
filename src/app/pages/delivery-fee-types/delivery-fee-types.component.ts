import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
  
  @Component({
    selector: 'app-delivery-fee-types',
    templateUrl: './delivery-fee-types.component.html',
    styleUrls: ['./delivery-fee-types.component.scss']
  })
  export class DeliveryFeeTypesComponent implements OnInit {
    pages: number = 1;
    currentPage: number = 1;
    perPage: number = 10;
    // 
    totalResult: number;
    // 
    response: any = [];
    constructor(
      private api: ApisService,
      private spinner: NgxSpinnerService,
      private change: ChangeDetectorRef,
      private alert: AlertService
      ) { }
  
    ngOnInit(): void {
      this.getData();
    }
  
    getData(){
      this.spinner.show();
      let data = {
          page: this.currentPage,
          limit: this.perPage
        };
      this.api.getDeliveryFeeNew(data).subscribe(
        (res) => {
          this.totalResult = res?.total || 0;
          this.pages = Math.ceil(this.totalResult / this.perPage);
          if (!this.pages) this.pages = 1;
          // 
          if(this.totalResult){
            this.response = res;
            this.mapData();
          }else{
            this.response = [];
            this.spinner.hide();
          }
          this.change.detectChanges();
        },
        (err) => {
        }
      );
    }
  
    mapData(){
      this.response = this.response.data.map((res: any) => {
        const result = {
          id: res.id || 0,
          type: res.type || "---",
          fees: res.fees || 0,
          country: res.country || "---"
        };
        return result;
      });
      this.spinner.hide();
    }
  
    selectPage(pageNumber) {
      this.currentPage = pageNumber;    
      this.getData();
    }
  
  }
  