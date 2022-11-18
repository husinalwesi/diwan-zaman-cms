import { ActivatedRoute } from '@angular/router';
import { AlertService } from './../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {

  isDeletedPage: boolean = false;
  search: string = "";
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  // 
  totalResult: number;
  // 
  response: any;
  isSubmitted: boolean = false;
  parentId: string = "";
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private shared: SharedService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("category-deleted") !== -1;
    this.parentId = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage,
        parent_id: this.parentId,
      };
    if(this.search) data["name"] = this.search;

    let path = this.isDeletedPage ? "category/deleted/list" : "category/list";
    this.api.getCategory(data,path).subscribe(
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
        this.spinner.hide();
      }
    );
  }

  mapData(){
    this.response = this.response.data.map((res: any) => {
      const result = {
        id: res.id,
        name: this.shared.extractTwoLangName(res.name,res.name_ar),
        isMain: !res.parent ? true : false,
        img: res.image
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  deleteCategory(id){
    this.spinner.show();
    this.api.deleteCategory(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        // 
        this.alert.success({title: res.data});
        // 
        this.getData();
        // 
      },
      (err) => {        
        this.spinner.hide();
        this.alert.error({title: err.error.data});
      }
    );    
  }

  backPage(){
    this.shared.backToPreviousPage();
  }
  // unDelete(id){
  //   this.spinner.show();
  //   this.api.restoreCategory(id).subscribe(
  //     (res) => {
  //       //
  //       this.alert.success({title: "Category restored successfully."});
  //       this.getData();
  //       this.spinner.hide();
  //       // 
  //     },
  //     (err) => {
  //       // 
  //       this.alert.error({title: err.error.data});
  //       this.spinner.hide();
  //       // 
  //     }
  //   );
  // }

}
