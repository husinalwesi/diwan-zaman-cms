import { AlertService } from '../../_metronic/core/services/alert.service';
import { SharedService } from '../shared/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from '../shared/services/apis.service';
import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-website-content',
  templateUrl: './website-content.component.html',
  styleUrls: ['./website-content.component.scss']
})
export class WebsiteContentComponent implements OnInit {
  privacy_en: string = "";
  privacy_ar: string = "";
  terms_en: string = "";
  terms_ar: string = "";
  startTime: string = "";
  endTime: string = "";
  img1: any;
  img2: any;
  image_url: any = environment.defaultImgEle;
  image_url2: any = environment.defaultImgEle;



  isSubmitted: boolean = false;
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef,
    private shared: SharedService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.spinner.show();

    this.api.getSharedData({}).subscribe(
      (response) => {
        this.image_url = response.dataObject.banner1;
        this.image_url2 = response.dataObject.banner2;
        this.startTime = response.dataObject.startTime;
        this.endTime = response.dataObject.closeTime;
        this.spinner.hide();
      },
      (err) => {
        // this.getDefaultData();
        this.spinner.hide();
      }
    );
    this.api.getSiteContent({}).subscribe(
      (response) => {
        this.privacy_en = response.dataObject[0].value_en;
        this.privacy_ar = response.dataObject[0].value_ar;
        this.terms_en = response.dataObject[1].value_en;
        this.terms_ar = response.dataObject[1].value_ar;
        // this.siteContent = response;
        // this.mapData();
        this.spinner.hide();
      },
      (err) => {
        // this.getDefaultData();
        this.spinner.hide();
      }
    );
  }

  mapData() {
    // this.formattedResponse = [];
    // this.data.data = [this.data.data];
    // this.formattedResponse = this.data.data.map((res: any) => {
    //   // 

    //   let tempType = res.type;
    //   if (tempType == "about_us") tempType = 1;
    //   else if (tempType == "terms_conditions") tempType = 2;
    //   else if (tempType == "privacy_policy") tempType = 4;

    //   const result = {
    //     id: this.pageType,
    //     title: res.key?.en || "",
    //     title_ar: res.key?.ar || "",
    //     desc: res.content?.en || "",
    //     content_ar: res.content?.ar || "",
    //     type: tempType
    //   };
    //   return result;
    // });

    // this.spinner.hide();
    // this.cd.detectChanges();
  }

  submitForm(form) {
    this.isSubmitted = true;
    if (form.valid) {
      let data1 = {
        privacy_en: this.privacy_en,
        privacy_ar: this.privacy_ar,
        terms_en: this.terms_en,
        terms_ar: this.terms_ar,
      };
      let data2 = {
        banner1: this.image_url,
        banner2: this.image_url2,
        startTime: this.startTime,
        closeTime: this.endTime,
      };
      this.api.editsite_content(data1).subscribe(
        (res) => {
          // this.image_url2 = res.dataObject;
          this.cd.detectChanges();
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
      // 
      this.api.editSharedData(data2).subscribe(
        (res) => {
          // this.image_url2 = res.dataObject;
          this.cd.detectChanges();
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    } else {
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  selectFileEmiter(e) {
    this.spinner.show();
    this.api.uploadFile(e.file).subscribe(
      (res) => {
        this.image_url = res.dataObject;
        this.cd.detectChanges();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  selectFileEmiter2(e) {
    this.spinner.show();
    this.api.uploadFile(e.file).subscribe(
      (res) => {
        this.image_url2 = res.dataObject;
        this.cd.detectChanges();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  // readURL(input) {
  //   let _this = this;
  //   var reader = new FileReader();
  //   reader.onload = function (e) {
  //     _this.image_url = e.target.result;
  //   };
  //   reader.readAsDataURL(input);
  // }

  // readURL2(input) {
  //   let _this = this;
  //   var reader = new FileReader();
  //   reader.onload = function (e) {
  //     _this.image_url2 = e.target.result;
  //   };
  //   reader.readAsDataURL(input);
  // }

}
