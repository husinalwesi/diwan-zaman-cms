import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';

@Component({
  selector: 'app-delivery-fees',
  templateUrl: './delivery-fees.component.html',
  styleUrls: ['./delivery-fees.component.scss']
})
export class DeliveryFeesComponent implements OnInit {
  isDeletedPage: boolean = false;
  search: string = "";
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  // 
  totalResult: number = 0;
  // 
  response: any;
  isSubmitted: boolean = false;
  // 
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("delivery-fees-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    if(this.search) data["search"] = this.search;

    let path = this.isDeletedPage ? "delivery/deleted" : "delivery";
    this.api.getDelivery(data,path).subscribe(
      (res) => {
        // 
        if(this.isDeletedPage) this.totalResult = res?.data?.length || 0;
        else this.totalResult = res?.total || 0;
        // 
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
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  mapData(){
    this.response = this.response.data.map((res: any) => {
      const result = {
        id: res.id || 0,
        city: res.city || "---",
        // delivery: res.delivery || 0,
        // shop: "Shop 2"
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  deleteDeliveryFees(id){
    this.spinner.show();
    this.api.deliveryDelete(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Delivery fees deleted successfully."});
        this.getData();
        // 
      },
      (err) => {        
        this.spinner.hide();
        this.alert.error({title: err.error.data});
      }
    );    
  }

  unDelete(id){
    this.spinner.show();
    this.api.restoreDelivery(id).subscribe(
      (res) => {
        //
        this.alert.success({title: "Delivery fees restored successfully."});
        this.getData();
        this.spinner.hide();
        // 
      },
      (err) => {
        // 
        this.alert.error({title: err.error.data});
        this.spinner.hide();
        // 
      }
    );
  }

}
