import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-service-center-edit',
  templateUrl: './service-center-edit.component.html',
  styleUrls: ['./service-center-edit.component.scss']
})
export class ServiceCenterEditComponent implements OnInit {
  Subscription_id: string = "0";
  SubscriptionList: any = [];
  is_sponsored: boolean = false;
  email: string = "";  
  longitude: string = "";
  latitude: string = "";
  totalBitWise: number = 0;
  name_en: string = "";
  name_ar: string = "";
  description: string = "";
  description_ar: string = "";
  isSubmitted: boolean = false;
  services: any = [];
  servicesMultiple: any = [];
  servicesList: any = [];
  status: string = "0";
  mainCategories: any = [];
  mainCategoriesList: any = []; 
  // 
  secondary_email: string = "";
  secondary_phone_number: string = "";    
  // 
  statusList: any = [
    {
      id: "available",
      name: "Available"
    },
    {
      id: "busy",
      name: "Busy"
    }
  ];
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  id: string = "";
  response: any;
  slots: any = [];
  from: string = "0";
  to: string = "0";
  estimatedTime: string = "";
  brand: any = [];
  timeList: any = [
    {
      id: 1,
      value: "01:00"
    },
    {
      id: 2,
      value: "02:00"
    },
    {
      id: 3,
      value: "03:00"
    },
    {
      id: 4,
      value: "04:00"
    },
    {
      id: 5,
      value: "05:00"
    },
    {
      id: 6,
      value: "06:00"
    },
    {
      id: 7,
      value: "07:00"
    },
    {
      id: 8,
      value: "08:00"
    },
    {
      id: 9,
      value: "09:00"
    },
    {
      id: 10,
      value: "10:00"
    },
    {
      id: 11,
      value: "11:00"
    },
    {
      id: 12,
      value: "12:00"
    },
    {
      id: 13,
      value: "13:00"
    },
    {
      id: 14,
      value: "14:00"
    },
    {
      id: 15,
      value: "15:00"
    },
    {
      id: 16,
      value: "16:00"
    },
    {
      id: 17,
      value: "17:00"
    },
    {
      id: 18,
      value: "18:00"
    },
    {
      id: 19,
      value: "19:00"
    },
    {
      id: 20,
      value: "20:00"
    },
    {
      id: 21,
      value: "21:00"
    },
    {
      id: 22,
      value: "22:00"
    },
    {
      id: 23,
      value: "23:00"
    },
    {
      id: 24,
      value: "24:00"
    },
  ];
  brandList: any = [];
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'id',
    textField: 'value',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: false,
    enableCheckAll: false
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
    this.getSubscriptions();
    if(this.TranslationService.isRTL()){      
      this.statusList = [
        {
          id: "available",
          name: "متاح"
        },
        {
          id: "busy",
          name: "مشغول"
        }
      ];
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'value',
        selectAllText: 'تحديد الجميع',
        unSelectAllText: 'الغاء تحديد الجميع',
        itemsShowLimit: 4,
        allowSearchFilter: false,
        enableCheckAll: false
      };
            
    }    
    this.isCreatePage = window.location.href.indexOf("local-center-service-create") !== -1;
    this.isEditPage = window.location.href.indexOf("local-center-service-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("local-center-service-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    this.getServiceData();
    this.getBrands();
    this.getCategories();
    if(!this.isCreatePage) this.getData();    
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

  getCategories(){
    this.spinner.show();
    this.mainCategoriesList = [];
    this.api.getCategorylist().subscribe(
      (res) => {
        this.mainCategoriesList = res.data.map((res: any) => {
          const result = {
            id: res?.id || 0,
            value: res?.name || "---"
          };
          return result;
        });
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );    
  }
  
  getBrands(){
    this.spinner.show();
    this.brandList = [];
    this.api.getBrandData({limit: 1000},"brand").subscribe(
      (res) => {
        this.brandList = res.data.map((res: any) => {
          const result = {
            id: res?.id || 0,
            value: res?.name || "---"
          };
          return result;
        });
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );
  }


  getServiceData(){
    this.spinner.show();
    this.servicesMultiple = [];
    this.api.getService({limit: 1000},"service").subscribe(
      (res) => {
        this.servicesMultiple = res.data.map((res: any) => {
          const result = {
            id: res?.id || 0,
            value: res?.name || "---"
          };
          return result;
        });
        this.spinner.hide();
        this.change.detectChanges();
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
    this.api.getServiceCenterByID(this.id).subscribe(
      (res) => {
        // 
        this.response = res;
        this.mapData();
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapData(){
    this.name_en = this.response?.data?.name?.en || "";
    this.name_ar = this.response?.data?.name?.ar || "";
    this.setStatusSelected(this.response?.data?.busy_status || 0);
    // this.services = this.response?.data?.services && this.response?.data?.services[0] ? this.response?.data?.services[0]?.id : 0;  
    this.slots = this.response.data?.slots;
    this.from = this.response.data?.from;
    this.to = this.response.data?.to;
    this.description = this.response.data?.description?.en;
    this.description_ar = this.response.data?.description?.ar;
    this.estimatedTime = this.response.data?.estimated_time;
    this.totalBitWise = this.response.data?.day;  
    // 
    let services: any = [];
    this.response.data.services.forEach(element => {
      services.push(
        {
          id: element.id,
          value: element.name.en
        }
      )
    });
    this.services = services;
    // 
    if(this.response.data?.brands){
      let brand: any = [];
      this.response.data?.brands.forEach(element => {
        brand.push(
          {
            id: element.id,
            value: element.name.en
          }
        )
      });
      this.brand = brand;
    }
    if(this.response.data?.categories){
      let mainCategories: any = [];
      this.response.data?.categories.forEach(element => {
        mainCategories.push(
          {
            id: element.id,
            value: element.name.en
          }
        )
      });
      this.mainCategories = mainCategories;
    }
    // 
    this.longitude = this.response.data.longitude || 0;
    this.latitude = this.response.data.latitude || 0;
    // 
    this.Subscription_id = this.response.data.Subscription_id || 0;
    this.email = this.response.data.email || "";    
    let tempIs_sponsored = this.response.data.is_sponsored || "0";
    this.is_sponsored = tempIs_sponsored == "1" ? true : false;    
    // 
    this.secondary_email = this.response.data.secondary_email || "";        
    this.secondary_phone_number = this.response.data.secondary_phone_number || 0;    
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  setStatusSelected(status){
    let optionStatus: string = "";
    if(status == "1") optionStatus = "busy";
    else optionStatus = "available";
    this.status = optionStatus;
  }

  submitForm(form){
    this.spinner.show();
    this.isSubmitted = true;
    if(form.valid
      && form.value.from !== '0'
      && form.value.to !== '0'
      && Number(form.value.to) > Number(form.value.from)
      && this.Subscription_id != "0"
      ){
      // const data = new FormData();
      // data.append('name',form.value.name_en);
      // data.append('name_ar',form.value.name_ar);
      // data.append('service_id[]',form.value.services);
      // data.append('busy_status',form.value.status == "available" ? "0" : "1");
      // data.append('day',String(this.totalBitWise));
      // data.append('from',form.value.from);
      // data.append('to',form.value.to);
      // data.append('estimated_time',form.value.estimated_time);
      let data = {
        name: form.value.name_en,
        name_ar: form.value.name_ar,
        // "service_id[]": form.value.services,
        busy_status: form.value.status == "available" ? "0" : "1",
        day: this.totalBitWise,
        from: form.value.from,
        to: form.value.to,
        estimated_time: form.value.estimatedTime,
        description: form.value.description,
        description_ar: form.value.description_ar,
        longitude: this.longitude,
        latitude: this.latitude,
        email: this.email,
        Subscription_id: this.Subscription_id,
        is_sponsored: this.is_sponsored,
        secondary_email: this.secondary_email,
        secondary_phone_number: this.secondary_phone_number        
      };


      // this.services.forEach((e,i) => {
      //   data[`service_id[${i}]`] = e.id;
      // });
      // 
      let service_id = [];
      this.services.forEach((e,i) => {
        service_id.push(e.id);
      });
      data[`service_id`] = service_id;
      // 
      let brand_temp = [];
      this.brand.forEach((e,i) => {
        brand_temp.push(e.id);
      });
      data[`brand_id`] = brand_temp;
      // 
      let categories_temp = [];
      this.mainCategories.forEach((e,i) => {
        categories_temp.push(e.id);
      });
      data[`category_id`] = categories_temp;
      // 
      if(this.isEditPage){
        // data.append('id',this.id);
        // data.append('_method','PUT');
        data["id"] = this.id;
        data["_method"] = "PUT";
        // 
        this.api.editServiceCenter(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Local center service updated successfully." });
            this.getData();
            this.spinner.hide();
          },
          (err) => {
            // 
            this.alert.errorAPI(err.error.errors);
            this.spinner.hide();
            // 
          }
        );
        // 
      }else if(this.isCreatePage){
        this.api.addServiceCenter(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Local center service created successfully." });
            this.shared.redirectTo("/local-center-service");
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
        // 
      }
    }else{
      this.spinner.hide();
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  cancelChanges(){
    this.getData();
  }

  bitWiseEmiter(event){
    this.totalBitWise = event;
  }

  checkValidationTime(form){
    if(Number(form.controls.to?.value) > Number(form.controls.from?.value)){
      return true;
    }else{
      return false;
    };
  };

  changeLocationEmiter(e){
    this.longitude = e.longitude;
    this.latitude = e.latitude;
  }

}
