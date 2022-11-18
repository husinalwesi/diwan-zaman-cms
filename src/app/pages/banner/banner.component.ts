import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})

export class BannerComponent implements OnInit {
  isDeletedPage: boolean;
  isToggle: boolean = false;
  search: string;
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  response: any = [];

  constructor(
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private shared: SharedService
    ){}

    ngOnInit(): void {
      this.isDeletedPage = window.location.href.indexOf("banner-deleted") !== -1;
      this.getData();
    }
  
    getData(){
      this.response = [];
      this.spinner.show();
      let data = {
        limit: this.perPage,
        page: this.currentPage,
      };
      let path = this.isDeletedPage ? "banner/deleted" : "banner";
      this.api.getBannerData(data,path).subscribe(
        (res) => {
          // 
          if(res.total) this.response = res;
          this.pages = Math.ceil(res.total / this.perPage);
          if (!this.pages) this.pages = 1;
          // 
          this.mapData();
          this.change.detectChanges();
          // 
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }

    mapData(){
      if(this.response && this.response.data){        
        this.response = this.response.data.map((res: any) => {
          const result = {
            id: res.id,
            name: res.name || "---",
            type: res.type || res.item || "---",
            image: res.image || environment.defaultImg
          };
          // 
          return result;
        });
      }
      this.spinner.hide();
    }

    delete(id){
      this.spinner.show();
      this.api.deleteBanner(id).subscribe(
        (res) => {
          //
          this.alert.success({ title: 'Banner deleted successfully.' });
          this.getData();
          this.spinner.hide();
          // 
        },
        (err) => {
          // 
          this.alert.error({ title: err.error.data });
          this.spinner.hide();
          // 
        }
      );
    }

    unDelete(id){
      this.spinner.show();
      this.api.unDeleteBanner(id).subscribe(
        (res) => {
          //
          this.alert.success({ title: 'Banner restored successfully.' });
          this.getData();
          this.spinner.hide();
          // 
        },
        (err) => {
          // 
          this.alert.error({ title: err.error.data });
          this.spinner.hide();
          // 
        }
      );
    }

    submitForm(form){

    }

    selectPage(pageNumber) {
      this.currentPage = pageNumber;
      this.getData();
    }

}
  