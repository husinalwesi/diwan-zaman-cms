import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ElementRef, ViewChild } from '@angular/core';
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { SharedService } from "../shared/services/shared.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  data: string[] = [
    // 'Melvin Walter Kissling Gam (April 25, 1931 – January 28, 2002) was a Costa Rican businessman who became',
    // 'chool campus in Costa Rica, as well as founding the Costa Rican non-profit organization Asociación de Empresarios para el',
    // 'Walter Kissling was born to Walter Kissling Rickli and Adela Gam Secen in Limón, Costa Rica on April 25, 1931',
    // 'r interview in 1998 he mentioned his mother as driving force in his life. “She was a fighting woman.',
    // 'Kissling graduated from Colegio Seminario in San José in 1948. After graduation he worked selling cheese and as a receptionist in',
    // 'rican businessman who gave him 2 pamphlets and told him that if he learned them by heart he would hire him as',
    // 'Seeking to advance his career, Kissling joined Kativo Chemical in 1953. At that time the company was a small business',
    // 'l American markets.[1] With the acquisition of Kativo Chemical by H.B. Fuller in 1967, Kissling',
    // 'ile maintaining his role as general manager at Kativo Chemical. He then led the opening of several H.B Fuller',
    // 'He went on to serve the company in significant leadership positions, including senior vice president of international operations, and executive'
  ];
  draggingIndex: number;


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
    // private dragulaService: DragulaService,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private shared: SharedService
  ) {
    // dragulaService.setOptions('bag-one', {
    //   revertOnSpill: true
    // });
  }

  ngOnInit(): void {
    this.isDeletedPage = window.location.href.indexOf("category-deleted") !== -1;
    this.getData();
  }

  getData() {
    this.spinner.show();
    let data = {
      page: this.currentPage,
      limit: this.perPage
    };
    if (!this.isDeletedPage) data["mainOnly"] = true;
    if (this.search) data["name"] = this.search;

    let path = this.isDeletedPage ? "category/deleted/list" : "category/list";
    this.api.getCategory(data, path).subscribe(
      (res) => {
        this.response = res.dataObject;
        this.data = res.dataObject;
        this.spinner.hide();
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
    this.api.deleteCategory(id).subscribe(
      (res) => {
        if (res.status === "200") {
          this.spinner.hide();
          this.alert.success({ title: "Category deleted successfully." });
          this.getData();
        } else {
          this.spinner.hide();
          this.alert.error({ title: "There are items linked to this category" });
        }
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

  private _reorderItem(fromIndex: number, toIndex: number): void {
    const itemToBeReordered = this.data.splice(fromIndex, 1)[0];
    this.data.splice(toIndex, 0, itemToBeReordered);
    this.draggingIndex = toIndex;
    this.updateDB();
  }

  updateDB() {
    console.log(this.data);
    let data = [];
    for (let index = 0; index < this.data.length; index++) {
      let item: any = this.data[index];
      data.push({
        id: +item.id,
        index: index + 1
      });
    }
    // console.log(data);

    this.api.reordercategory(data).subscribe(
      (res) => {
      },
      (err) => {
      }
    );


    // reordercategory
  }

  onDragStart(index: number): void {
    this.draggingIndex = index;
  }

  onDragEnter(index: number): void {
    if (this.draggingIndex !== index) {
      this._reorderItem(this.draggingIndex, index);
    }
  }

  onDragEnd(): void {
    this.draggingIndex = undefined;
  }


}
