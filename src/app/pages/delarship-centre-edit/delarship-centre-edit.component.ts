import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../pages/shared/services/shared.service';
import { environment } from "src/environments/environment";
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-delarship-centre-edit',
  templateUrl: './delarship-centre-edit.component.html',
  styleUrls: ['./delarship-centre-edit.component.scss']
})
export class DelarshipCentreEditComponent implements OnInit {
  Subscription_id: string = "0";
  SubscriptionList: any = [];
  is_sponsored: boolean = false;
  email: string = "";  
  longitude: string = "";
  latitude: string = "";
  // 
  isSubmitted: boolean = false;
  // totalBitWise: number = 0;
  totalBitWise: number = 126;
  services: any = [];
  servicesList: any = [];
  id: string = "";
  dealership: string = "";
  dealership_ar: string = "";
  hourlyRate: string = "";
  description: string = "";
  description_ar: string = "";
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  response: any;
  brand: any = [];
  brandList: any = [];
  slots: any = [];
  from: string = "0";
  to: string = "0";
  secondary_email: string = "";
  secondary_phone_number: string = "";    
  estimatedTime: string = "";
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
  constructor(private TranslationService: TranslationService,private api: ApisService, private change: ChangeDetectorRef, private spinner: NgxSpinnerService, private alert: AlertService, private route: ActivatedRoute, private shared: SharedService) {
  }

  ngOnInit(): void {
    if(this.TranslationService.isRTL()){      
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'value',
        selectAllText: 'تحديد الكل',
        unSelectAllText: 'الغاء تحديد الكل',
        itemsShowLimit: 4,
        allowSearchFilter: false,
        enableCheckAll: false,
      };
    }

    this.isCreatePage = window.location.href.indexOf("dealership-centre-create") !== -1;
    this.isEditPage = window.location.href.indexOf("dealership-centre-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("dealership-centre-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if(!this.isCreatePage) this.getData();
    this.getBrands();
    this.getServiceData();
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

  getData(){
    this.spinner.show();
    this.api.getDealershipByID(this.id).subscribe(
      (res) => {
        // 
        this.response = res;
        this.mapData();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getServiceData(){
    this.spinner.show();
    this.servicesList = [];
    this.api.getService({limit: 1000},"service").subscribe(
      (res) => {
        this.servicesList = res.data.map((res: any) => {
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

  mapData(){
    let services = [];
    this.response.data?.services.forEach(element => {
      services.push({
        id: element?.id || 0,
        value: element?.name.en || "---"
      })
    });
    this.dealership = this.response.data.name.en;
    this.dealership_ar = this.response.data.name.ar;
    this.description = this.response.data.description.en;
    this.description_ar = this.response.data.description.ar;
    this.hourlyRate = this.response.data.rate;
    this.brand = this.response.data?.brand_id || 0;
    this.services = services || 0;
    this.slots = this.response.data?.slots;
    this.from = this.response.data?.from;
    this.to = this.response.data?.to;
    this.estimatedTime = this.response.data?.estimated_time;
    this.totalBitWise = this.response.data?.day;
    //
    this.longitude = this.response.data.longitude.en || 0;
    this.latitude = this.response.data.latitude.en || 0;
    //     
    this.Subscription_id = this.response.data.Subscription_id || 0;
    this.email = this.response.data.email || "";    
    let tempIs_sponsored = this.response.data.is_sponsored || "0";
    this.is_sponsored = tempIs_sponsored == "1" ? true : false;    

    this.secondary_email = this.response.data.secondary_email || "";        
    this.secondary_phone_number = this.response.data.secondary_phone_number || 0;

    // 
    this.change.detectChanges();
    this.spinner.hide();
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
      // 
      let services = [];
      // form.value.services.forEach(element => {
      //   services.push(element.id)
      // });
      let data = {
        name: form.value.dealership,
        name_ar: form.value.dealership_ar,
        rate: parseInt(form.value.hourlyRate),
        description: form.value.description,
        description_ar: form.value.description_ar,
        brand_id: form.value.brand,
        service_id: services,
        day: this.totalBitWise,
        from: form.value.from,
        to: form.value.to,
        estimated_time: form.value.estimatedTime,
        longitude: this.longitude,
        latitude: this.latitude,
        email: this.email,
        Subscription_id: this.Subscription_id,
        is_sponsored: this.is_sponsored ? "1" : "0",
        secondary_email: this.secondary_email,
        secondary_phone_number: this.secondary_phone_number
      };
      

      // 
      if(this.isEditPage){
        data["id"] = this.id;
        data["_method"] = "PUT";
        // 
        this.api.editDealership(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Dealership updated successfully." });
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
        this.api.createDealership(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Dealership created successfully." });
            this.shared.redirectTo("/dealership-centre");
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
    this.mapData();
  }
  
  backPage(){
    this.shared.backToPreviousPage();
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
