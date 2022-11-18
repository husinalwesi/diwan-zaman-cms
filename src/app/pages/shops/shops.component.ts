import { SharedService } from './../shared/services/shared.service';
import { AlertService } from './../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  isDeletedPage: boolean;
  search: string = "";
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  // 
  totalResult: number;
  // 
  response: any;
  isSubmitted: boolean = false;
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private shared: SharedService

    ) { }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("shops-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
    };
    let path = this.isDeletedPage ? "shop/deleted/list" : "shop";
    this.api.getShopData(data,path).subscribe(
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
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );
  }

  mapData(){
    this.response = this.response.data.map((res: any) => {
      const result = {
        id: res.id,
        name: res.name,
        img: res.image || environment.defaultImgEle,
        // 
        email: res.email,
        phone_number: res.phone_number,
        is_sponsored: res.is_sponsored == "1" ? true : false,
        subscription: res.subscription_duration || 0,
        subscription_expiry_date: res.subscription_expiry && res.subscription_expiry != "-" ? res.subscription_expiry : '',
        paid_unpaid: res.subscription_status || ''

      };
      return result;
    });
    this.spinner.hide();
  }

  deleteShop(id){
    this.spinner.show();
    this.api.deleteShop(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Shop deleted successfully."});
        this.getData();
        // 
      },
      (err) => {        
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );    
  }

  unDelete(id){
    this.spinner.show();
    this.api.restoreShop(id).subscribe(
      (res) => {
        //
        this.alert.success({title: "Shop restored successfully."});
        this.getData();
        this.spinner.hide();
        // 
      },
      (err) => {
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

}
