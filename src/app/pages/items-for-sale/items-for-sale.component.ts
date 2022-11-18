import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-items-for-sale',
  templateUrl: './items-for-sale.component.html',
  styleUrls: ['./items-for-sale.component.scss']
})
export class ItemsForSaleComponent implements OnInit {
  isDeletedPage: boolean = false;
  search: string = "";
  name: string = "";
  mainCategory: string = "0";
  mainCategoryList: any = [];
  subCategory: string = "0";
  subCategoryList: any = [];
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  isToggle: boolean = false;
  status: string = "1";
  isPendingPage: boolean = false;
  // 
  // seller_name: string = "";
  // PartName: string = "0";
  // subCategory: string = "0";
  // category: string = "0";
  // 
  // PartNameList: any = [
  //   {id: 1, value: "Option 1"},
  //   {id: 2, value: "Option 2"}
  // ];

  // statusList: any = [
  //   {
  //     id: 1,
  //     value: "Approved"
  //   },
  //   {
  //     id: 0,
  //     value: "Not approved"
  //   }
  // ]
  // 
  totalResult: number;
  // 
  response: any;
  isSubmitted: boolean = false;
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    if (window.location.href.indexOf("items-for-sale-pending") !== -1) {
      this.status = "0";
      this.isPendingPage = true;
    }
    // 
    this.isDeletedPage = window.location.href.indexOf("items-for-sale-deleted") !== -1;
    this.getData();
    // this.getMainCategoryData();
  }

  getData() {
    this.spinner.show();
    // let data = {
    //     page: this.currentPage,
    //     limit: this.perPage
    //   };
    // if(this.name) data["name"] = this.name;
    // if(this.mainCategory != "0") data["category_id"] = this.mainCategory;
    // if(this.mainCategory != "0" && this.subCategory != "0") data["sub_category_id"] = this.subCategory;
    // if(this.status != "-1") data["status"] = this.status;
    // let path = this.isDeletedPage ? "item/deleted/list" : "item/list";
    this.api.getItemsList().subscribe(
      (res) => {
        this.response = res.dataObject;
        this.spinner.hide();
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
        // sellerName: "Hussein Alwesi" || "---",
        partName: res.name,
        partNameFull: this.shared.extractTwoLangName(res.name, res.name_ar),
        price: res.price ? `${res.price} JD` : "---",
        category: res.category || "---",
        status: res.status,
        statusName: res.status_name || "---"
        // quantity: 65
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;
    this.getData();
  }

  deleteItem(id) {
    this.spinner.show();
    this.api.deleteItemForSale(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({ title: "Item Deleted successfully." });
        this.getData();
        // 
      },
      (err) => {
        this.spinner.hide();
        this.alert.error({ title: err.error.data });
      }
    );
  }

  approveItem(item, method) {
    if (method == 1 && item.status == 1) {
      this.alert.error({ title: "Item already Approved" });
      return;
    }
    if (method == 0 && item.status == 0) {
      this.alert.error({ title: "Item already Not Approved" });
      return;
    }
    this.spinner.show();
    this.api.itemChangeStatus(item.id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({ title: "Item has been changed successfully." });
        this.getData();
        // 
      },
      (err) => {
        this.spinner.hide();
        this.alert.error({ title: err.error.data });
      }
    );
  };

  // addQuantity(id){

  // }

  unDelete(id) {
    this.spinner.show();
    this.api.restoreItemForSale(id).subscribe(
      (res) => {
        //
        this.alert.success({ title: "Item Restored successfully." });
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

  submitForm(f) {

  }

  getMainCategoryData() {
    this.spinner.show();
    this.api.getParentCategoryList().subscribe(
      (res) => {
        // 
        if (res.length) {
          this.mainCategoryList = res;
          this.mapMainCategoryData();
        } else {
          this.mainCategoryList = [{ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" }];
          this.spinner.hide();
        }
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapMainCategoryData() {
    this.mainCategoryList = this.mainCategoryList.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name_ar || "---"
      };
      return result;
    });
    this.mainCategoryList.unshift({ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" });
    this.spinner.hide();
  }

  mainCategoryChange(e?) {
    if (this.mainCategory == "0") {
      this.subCategoryList = [
        { id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" }
      ];
      this.subCategory = "0";
    } else {
      // 
      this.spinner.show();
      this.api.getSubCategoryList(this.mainCategory).subscribe(
        (res) => {
          // 
          if (res.length) {
            this.subCategoryList = res;
            this.mapSubCategoryData();
          } else {
            this.subCategoryList = [{ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" }];
            this.spinner.hide();
          }
          this.change.detectChanges();
        },
        (err) => {
          this.spinner.hide();
        }
      );
      // 
    }
  }
  mapSubCategoryData() {
    this.subCategoryList = this.subCategoryList.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name_ar || "---"
      };
      return result;
    });
    this.subCategoryList.unshift({ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" });
    this.spinner.hide();
  }

}
