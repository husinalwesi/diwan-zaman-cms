import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  isDeletedPage: boolean = false;
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  totalResult: number;
  // 
  response: any;
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("discount-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    let path = this.isDeletedPage ? "discount/deleted" : "discount";
    this.api.getDiscount(data,path).subscribe(
      (res) => {
        this.totalResult = res.total;
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
      }
    );
  }

  mapData(){
    console.log(this.response);
    
    this.response = this.response.data.map((res: any) => {
      const result = {
        id: res.id || 0,
        type: res.type || "---",
        percentage: res.percentage ? res.percentage + " %" : "0.00 %",
        nameOfItemDealership: res.type_data?.name?.en || "---"
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  deleteItem(id){
    this.spinner.show();
    this.api.deleteDiscount(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Discount Deleted successfully."});
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
    this.api.restoreDiscount(id).subscribe(
      (res) => {
        //
        this.alert.success({title: "Discount Restored successfully."});
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
