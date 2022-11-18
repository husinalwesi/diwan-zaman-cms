import { SharedService } from './../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from './../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-shops-edit',
  templateUrl: './shops-edit.component.html',
  styleUrls: ['./shops-edit.component.scss']
})
export class ShopsEditComponent implements OnInit {

  isSubmitted: boolean = false;
  id: string = "";
  name: string = "";
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  response: any;
  image_url: string = environment.defaultImgEle;
  file: any = null;
  categoryList: any = [];
  selectedItems= [];
  // 
  longitude: string = "";
  latitude: string = "";
  Subscription_id: string = "0";
  SubscriptionList: any = [];
  // 
  email: string = "";
  oldEmail: string = "";  
  phone_number: string = "";
  // 
  secondary_email: string = "";
  secondary_phone_number: string = "";  
  is_sponsored: boolean = false;
  // 
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: false,
    enableCheckAll: false,
  };
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService
    ) {
  }

  ngOnInit(): void {
    if(this.TranslationService.isRTL()){      
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'value',
        selectAllText: 'تحديد الجميع',
        unSelectAllText: 'الغاء تحديد الجميع',
        itemsShowLimit: 4,
        allowSearchFilter: false,
        enableCheckAll: false,
      };
    }    
    this.isCreatePage = window.location.href.indexOf("shops-create") !== -1;
    this.isEditPage = window.location.href.indexOf("shops-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("shops-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if(!this.isCreatePage) this.getData();
    this.getMainCategoryData();
    this.getSubscriptions();
  }

  getSubscriptions(){
    this.spinner.show();
    this.api.getSubscriptions({ page: 1, limit: 1000 },'subscription').subscribe(
      (res) => {
          this.SubscriptionList = res.data.map((res: any) => {
            const result = {
              id: res.id,
              value: res.title || "---"
            };
            return result;
          });
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );    
  }

  getMainCategoryData(){
    this.spinner.show();
    this.api.getParentCategoryList().subscribe(
      (res) => {
          this.categoryList = res;
          this.categoryList = this.categoryList.map((res: any) => {
            const result = {
              id: res.id,
              value: res.name_ar || "---"
            };
            return result;
          });
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getData(){
    this.spinner.show();
    this.api.getShopByID(this.id).subscribe(
      (res) => { 
        this.response = res;
        this.mapData();
      },
      (err) => {
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );
  }

  mapData(){
    let categoryes = []  
    this.name = this.response.data.name.en || "",
    this.image_url = this.response.data.image || environment.defaultImg;

    this.longitude = this.response.data.longitude || 0;
    this.latitude = this.response.data.latitude || 0;

    this.phone_number = this.response.data.phone_number || "";
    this.email = this.response.data.email || "";    
    this.oldEmail = this.email;
    this.secondary_phone_number = this.response.data.secondary_phone_number || "";
    this.secondary_email = this.response.data.secondary_email || "";        
    this.Subscription_id = this.response.data.Subscription_id || 0;

    let tempIs_sponsored = this.response.data.is_sponsored || "0";
    this.is_sponsored = tempIs_sponsored == "1" ? true : false;

    this.response.data.categories.forEach(element => {
      categoryes.push(
        {
          id: element.id,
          value: element.name.ar
        }
      )
    });
    // 
    this.selectedItems = categoryes;
    this.change.detectChanges();
    this.spinner.hide();
  }

  submitForm(form){
    this.spinner.show();
    this.isSubmitted = true;
    if(form.valid && this.Subscription_id != "0"){
      // 
      let data = new FormData();
      data.append('name', form.value.name);
      data.append('longitude', this.longitude);
      data.append('latitude', this.latitude);

      data.append('phone_number', this.phone_number);

      data.append('secondary_email', this.secondary_email);
      data.append('secondary_phone_number', this.secondary_phone_number);

      data.append('Subscription_id', this.Subscription_id);
      data.append('is_sponsored', this.is_sponsored ? "1" : "0");
      


      this.selectedItems.forEach((e,i) => {
        data.append(`categories[${i}]`, e.id);
      });
      if(this.file) data.append('image', this.file, this.file.name);
      // 
      if(this.isEditPage){
        data.append('id', this.id);
        data.append('_method', "PUT");
        // 
        if(this.email != this.oldEmail){
          data.append('email', this.email);
        }
        // 
        this.api.editShop(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Shop updated successfully." });
            this.getData();
            this.spinner.hide();
          },
          (err) => {
            if (err.error.errors) this.alert.errorAPI(err.error.errors);
            else this.alert.error({ title: err.error.message });
            this.spinner.hide();
          }
        );
        // 
      }else if(this.isCreatePage){
        data.append('email', this.email);        
        this.api.addShop(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Shop created successfully." });
            this.shared.redirectTo("/shops");
            this.spinner.hide();
            //
          },
          (err) => {
            if (err.error.errors) this.alert.errorAPI(err.error.errors);
            else this.alert.error({ title: err.error.message });
            this.spinner.hide();
          }
        );
        // 
      }
    }else{
      this.spinner.hide();
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  cancelChanges(){
    this.mapData();
  }
  
  backPage(){
    this.shared.backToPreviousPage();
  }

  selectFileEmiter(e){
    this.file = e.file;
  }

  changeLocationEmiter(e){
    this.longitude = e.longitude;
    this.latitude = e.latitude;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }


}
