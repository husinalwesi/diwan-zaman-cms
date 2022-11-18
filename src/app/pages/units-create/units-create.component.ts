import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../pages/shared/services/shared.service';
import { environment } from "src/environments/environment";
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-units-create',
  templateUrl: './units-create.component.html',
  styleUrls: ['./units-create.component.scss']
})
export class UnitsCreateComponent implements OnInit {
  isSubmitted: boolean = false;
  id: string = "";
  title: string = "";
  title_ar: string = "";
  category: string = "0";
  categoryList: any = [
    { id: 0, value: "-- Select one --" }
  ];
  isCreatePage: boolean = false;
  isEditPage: boolean = false;
  isViewPage: boolean = false;
  response: any;
  image_url: string = environment.defaultImgEle;
  file: any = null;
  // subCategory: string = "0";
  subCategoryList: any = [
    // { id: 0, value: "-- Select one --" }
  ];
  constructor(private api: ApisService, private change: ChangeDetectorRef, private spinner: NgxSpinnerService, private alert: AlertService, private route: ActivatedRoute, private shared: SharedService, private TranslationService: TranslationService) {
  }

  ngOnInit(): void {
    if (this.TranslationService.isRTL()) {
      this.categoryList = [
        { id: 0, value: "-- اختر خيار --" }
      ];
    }
    this.isCreatePage = window.location.href.indexOf("units-create") !== -1;
    this.isEditPage = window.location.href.indexOf("category-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("category-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if (!this.isCreatePage) this.getData();
    // this.getParentData();
  }

  mapSubCategoryData() {
    this.subCategoryList = this.subCategoryList.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name_ar || "---"
      };
      return result;
    });
    // this.subCategoryList.unshift({ id: 0, value: "-- Select one --" });
    this.spinner.hide();
  }

  mainCategoryChange(e?) {
    if (this.category == "0") {
      this.subCategoryList = [
        // { id: 0, value: "-- Select one --" }
      ];
      // this.subCategory = "0";
    } else {
      // 
      this.spinner.show();
      this.api.getSubCategoryList(this.category).subscribe(
        (res) => {
          // 
          if (res.length) {
            this.subCategoryList = res;
            this.mapSubCategoryData();
          } else {
            // this.subCategoryList = [{ id: 0, value: "-- Select one --" }];
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

  getParentData() {
    this.spinner.show();
    this.api.getParentCategoryList().subscribe(
      (res) => {
        // 
        this.categoryList = res;
        this.mapParentData();
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapParentData() {
    this.categoryList = this.categoryList.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name_ar
      };
      return result;
    });
    this.categoryList.unshift({ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" });
    this.spinner.hide();
  }

  getData() {
    this.spinner.show();
    this.api.getUnitByID(this.id).subscribe(
      (res) => {
        this.title = res.dataObject.title_en;
        this.title_ar = res.dataObject.title_ar;
        this.change.detectChanges();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapData() {
    this.title = this.response.data.name.en;
    this.title_ar = this.response.data.name.ar;
    this.category = this.response.data.parent_id || 0;
    this.image_url = this.response.data.image;
    this.mainCategoryChange();
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  deleteCategory(id) {
    this.spinner.show();
    this.api.deleteCategory(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({ title: "Category deleted successfully." });
        this.mainCategoryChange();
        // 
      },
      (err) => {
        this.spinner.hide();
        this.alert.error({ title: err.error.data });
      }
    );
  }

  submitForm(form) {
    this.spinner.show();
    this.isSubmitted = true;
    if (form.valid) {
      // 
      let data = {
        title_en: form.value.title,
        title_ar: form.value.title_ar,
      };
      if (this.isCreatePage) {
        this.api.createUnit(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Unit created successfully." });
            this.shared.redirectTo("/units");
            this.spinner.hide();
            //
          },
          (err) => {
            //
            this.alert.errorAPI(err.error.errors);
            this.spinner.hide();
            // 
          }
        );
      } else {
        data["id"] = this.id;
        this.api.updateUnit(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Unit edited successfully." });
            // this.shared.redirectTo("/units");
            this.spinner.hide();
            //
          },
          (err) => {
            //
            this.alert.errorAPI(err.error.errors);
            this.spinner.hide();
            // 
          }
        );
      }
    } else {
      this.spinner.hide();
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  cancelChanges() {
    this.mapData();
  }

  backPage() {
    this.shared.backToPreviousPage();
  }

  selectFileEmiter(e) {
    this.file = e.file;
    console.log(this.file);
  }

}
