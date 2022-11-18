import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { SharedService } from "../shared/services/shared.service";

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss']
})
export class UnitsComponent implements OnInit {
  isDeletedPage: boolean = false;
  search: string = "";
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  // 
  totalResult: number;
  // 
  response: any = [];
  isSubmitted: boolean = false;
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("category-deleted") !== -1;
    this.getData();
  }

  getData() {
    this.spinner.show();
    // let data = {
    //   page: this.currentPage,
    //   limit: this.perPage
    // };
    // if (!this.isDeletedPage) data["mainOnly"] = true;
    // if (this.search) data["name"] = this.search;

    // let path = this.isDeletedPage ? "category/deleted/list" : "category/list";
    this.api.getUnits().subscribe(
      (res) => {
        this.response = res.dataObject;
        this.spinner.hide();
        this.change.detectChanges();
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
        // this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapData() {
    this.response = this.response.data.map((res: any) => {
      const result = {
        id: res.id,
        name: this.shared.extractTwoLangName(res.name, res.name_ar),
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

  deleteCategory(id) {
    this.spinner.show();
    this.api.deleteUnit(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({ title: "Unit deleted successfully." });
        this.getData();
        // 
      },
      (err) => {
        this.spinner.hide();
        this.alert.error({ title: err.error.data });
      }
    );
  }

  unDelete(id) {
    this.spinner.show();
    this.api.restoreCategory(id).subscribe(
      (res) => {
        //
        this.alert.success({ title: "Category restored successfully." });
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

}
