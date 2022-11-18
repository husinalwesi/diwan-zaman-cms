import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';

@Component({
  selector: 'app-delivery-fees-shop',
  templateUrl: './delivery-fees-shop.component.html',
  styleUrls: ['./delivery-fees-shop.component.scss']
})
export class DeliveryFeesShopComponent implements OnInit {
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
    this.api.getShopDeliveryFees(data).subscribe(
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
        shop: res.shop || "---",
        area: res.area || "---",
        delivery: res.delivery || 0
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  delete(id){
    this.spinner.show();
    this.api.deleteDeliveryFeeShop(id).subscribe(
      (res) => {
        this.alert.success({title: "Delivery Fees Shop has been Deleted."});
        this.spinner.hide();
        this.change.detectChanges();
        this.getData();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

}
