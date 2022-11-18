import { AlertService } from '../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from '../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

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
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("subscription-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    if(this.search) data["search"] = this.search;

    let path = this.isDeletedPage ? "subscription/deleted" : "subscription";
    this.api.getSubscriptions(data,path).subscribe(
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
        title: res.title || "---",
        duration: res.duration || "---",
        price: res.price || 0,
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  deleteSubscription(id){
    this.spinner.show();
    this.api.subscriptionDelete(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Subscription deleted successfully."});
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
    this.api.restoreSubscription(id).subscribe(
      (res) => {
        //
        this.alert.success({title: "Subscription restored successfully."});
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
