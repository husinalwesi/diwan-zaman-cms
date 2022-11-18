import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  isDeletedPage: boolean;
  search: string = "";
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  isToggle: boolean = false;
  totalResult: number;
  response: any = [];
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("reviews-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    if(this.search) data["search"] = this.search;
    let path = this.isDeletedPage ? "review/deleted" : "review";
    this.api.getReview(data,path).subscribe(
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
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  mapData(){
    this.response = this.response.data.map((res: any) => {
      const result = {
        id: res.id || 0,
        name: res.name || "---",
        rating: res.rating || 0,
        user_id: res.user_id || 0,
        review: res.review || "---",
        review_for: res.review_for || "---",
        review_for_detail: res.review_for_detail?.name?.en || res.review_for_detail?.name?.ar ||"---"
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
    this.api.deleteReview(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Review deleted successfully."});
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
    this.api.restoreReview(id).subscribe(
      (res) => {
        //
        this.alert.success({title: "Review restored successfully."});
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
