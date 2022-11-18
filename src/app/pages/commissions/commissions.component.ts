import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from './../shared/services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.scss']
})
export class CommissionsComponent implements OnInit {
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
    this.isDeletedPage = window.location.href.indexOf("commission-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    if(this.search) data["search"] = this.search;

    let path = this.isDeletedPage ? "commission/deleted" : "commission";
    this.api.getCommission(data,path).subscribe(
      (res) => { 
        if(this.isDeletedPage) this.totalResult = res?.data?.length || 0;
        else this.totalResult = res?.total || 0;
        this.pages = Math.ceil(this.totalResult / this.perPage);
        if (!this.pages) this.pages = 1;
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
        value: res.percentage + " %" || "---",
        category: res.category || "---",
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  deleteCommission(id){
    this.spinner.show();
    this.api.commissionDelete(id).subscribe(
      (res) => {
        this.spinner.hide();
        this.alert.success({title: "Commission deleted successfully."});
        this.getData();
      },
      (err) => {        
        this.spinner.hide();
        this.alert.error({title: err.error.data});
      }
    );    
  }

  unDelete(id){
    this.spinner.show();
    this.api.unDeleteCommission(id).subscribe(
      (res) => {
        this.alert.success({title: "Commission restored successfully."});
        this.getData();
        this.spinner.hide();
      },
      (err) => {
        this.alert.error({title: err.error.data});
        this.spinner.hide();
      }
    );
  }


}
