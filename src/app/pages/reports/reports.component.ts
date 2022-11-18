import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  // 
  totalResult: number;
  subjectData: any = [];
  // 
  response: any = [];
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.getSubjctsData();
  }

  getSubjectTitle(subject_id){
    for (let index = 0; index < this.subjectData.length; index++) {
      if(this.subjectData[index].id == subject_id) return this.subjectData[index].subject;
    }
    return "---";
  }

  getSubjctsData(){
    this.api.getSubjctsData({ page: 1, limit: 1000 },"subject").subscribe(
      (res) => {
        this.subjectData = res?.data || [];
        // this.totalResult = res?.total || 0;
        // this.pages = Math.ceil(this.totalResult / this.perPage);
        // if (!this.pages) this.pages = 1;
        // // 
        // if(this.totalResult){
        //   this.response = res;
        //   this.mapData();
        // }else{
        //   this.response = [];
        //   this.spinner.hide();
        // }
        this.change.detectChanges();
        this.getData();
      },
      (err) => {
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );  
  }  

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    this.api.getReports(data).subscribe(
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
        subject: this.getSubjectTitle(res.subject || "0"),        
        details: res.details || "---",

        customer_name: res.user.name || "---",
        email: res.user.email || "---",
        phone_number: res.user.phone_number || "---",

      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

}