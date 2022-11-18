import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';

@Component({
  selector: 'app-refunds',
  templateUrl: './refunds.component.html',
  styleUrls: ['./refunds.component.scss']
})
export class RefundsComponent implements OnInit {
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
    this.api.getRefund(data).subscribe(
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

  buildUserUrl(user_id,user_type){
    if(user_type == "admin") return `/admin-view/${user_id}`;
    if(user_type == "shop") return `/shops-view/${user_id}`;
    if(user_type == "service_center") return `/local-center-service-view/${user_id}`;
    if(user_type == "dealership") return `/dealership-centre-view/${user_id}`;
    return "#";
  }

  mapData(){
    this.response = this.response.data.map((res: any) => {
      let user_id = res.user_id;//get data from API
      let user_type = res.user_type;////get data from API

      const result = {
        id: res.id,
        order_id: res.order_id || 0,
        user_redirect: this.buildUserUrl(user_id,user_type),
        order_by: res.order_by || "---",
        status: res.status || "---",
        reason: res.reason || "---",
        items: res?.items ? res?.items.map((resp: any) => {
          const result = {
            name: resp?.name || "---"
          };
          return result;
        }).flatMap(//used to convert array of object to an array with a one array level.
          (elem) => elem.name
        ) : []
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  changeOrderStatus(e,orderID,index){
    // let currentValue = e?.target?.value;
    // this.response[index].status = currentValue;
    // //
    // this.spinner.show();
    // this.api.changeOrderStatus(orderID,currentValue).subscribe(
    //   (res) => {
    //     this.alert.success({title: "Order status is changed successfully."});
    //     this.spinner.hide();
    //     this.change.detectChanges();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //     console.log(err);
    //   }
    // );
  }

  explodArr(arr){
    if(arr.length > 0) return arr.toString();
    return "---";
  }

  approve(id){
    this.spinner.show();
    this.api.refundAccept(id).subscribe(
      (res) => {
        this.alert.success({title: "Order has been Approved."});
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

  reject(id){
    this.spinner.show();
    this.api.refundDecline(id).subscribe(
      (res) => {
        this.alert.success({title: "Order has been Rejected."});
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
