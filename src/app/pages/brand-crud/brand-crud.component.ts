import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-brand-crud',
  templateUrl: './brand-crud.component.html',
  styleUrls: ['./brand-crud.component.scss']
})
export class BrandCrudComponent implements OnInit {
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
    this.isDeletedPage = window.location.href.indexOf("brand-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
    };
    let path = this.isDeletedPage ? "brand/deleted" : "brand";
    this.api.getBrandData(data,path).subscribe(
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
        img: res.image
      };
      return result;
    });
    this.spinner.hide();
  }

  deleteBrand(id){
    this.spinner.show();
    this.api.deleteBrand(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Brand deleted successfully."});
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
    this.api.restoreBrand(id).subscribe(
      (res) => {
        //
        this.alert.success({title: "Brand restored successfully."});
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
