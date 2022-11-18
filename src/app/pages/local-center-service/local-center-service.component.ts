import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-local-center-service',
  templateUrl: './local-center-service.component.html',
  styleUrls: ['./local-center-service.component.scss']
})
export class LocalCenterServiceComponent implements OnInit {
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
    private TranslationService: TranslationService,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("local-center-service-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    if(this.search) data["search"] = this.search;

    let path = this.isDeletedPage ? "center/deleted" : "center";
    this.api.getServiceCenter(data,path).subscribe(
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
        name: res.name || "---",
        status: (res?.busy_status ? this.getStatusText(res.busy_status) : res["Busy status"]) || this.getStatusText(0),
        subscription: res.subscription_duration || 0
      };
      return result;
    });
    this.spinner.hide();
  }

  getStatusText(busy_status){
    if(busy_status == 1 || busy_status == "1") return this.TranslationService.isRTL() ? "مشغول" : "Busy";
    return this.TranslationService.isRTL() ? "متاح" : "Available";
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  delete(id){
    this.spinner.show();
    this.api.deleteServiceCenter(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Local center service deleted successfully."});
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
    this.api.restoreServiceCenter(id).subscribe(
      (res) => {
        //
        this.alert.success({title: "Local center service restored successfully."});
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
