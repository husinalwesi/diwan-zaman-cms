import { SharedService } from '../shared/services/shared.service';
import { AlertService } from '../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from '../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  isDeletedPage: boolean;
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
    this.isDeletedPage = window.location.href.indexOf("subjects-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
    };
    let path = this.isDeletedPage ? "subject/deleted/list" : "subject";
    this.api.getSubjctsData(data,path).subscribe(
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
        subject: res.subject || "---",
        typeName: res.type_name || "---"
      };
      return result;
    });
    this.spinner.hide();
  }

  delete(id){
    this.spinner.show();
    this.api.deleteSubject(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Subject deleted successfully."});
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
    this.api.unDeleteSubject(id).subscribe(
      (res) => {
        //
        this.alert.success({title: "Subject restored successfully."});
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
