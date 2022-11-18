import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-discount-edit',
  templateUrl: './discount-edit.component.html',
  styleUrls: ['./discount-edit.component.scss']
})
export class DiscountEditComponent implements OnInit {
  public expiry_date = new Date();
  expiry_dateFromAPI: string = "";
  // 
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  isSubmitted: boolean = false;
  id: string = "";
  set_all: string = "0";
  type: string = "0";
  percentage: string = "1";
  discountable_id: string = "0";
  set_allList: any = [
    { id: 0, value: "0" },
    { id: 1, value: "1" }
  ];
  typeList: any = [
    { id: 'Item', value: "Item" },
    { id: 'Service', value: "Service" },
    { id: 'Category', value: "Category" },

    { id: 'shop', value: "Shop" },
    { id: 'dealership', value: "Dealership" },
    { id: 'service_center', value: "Service Center" },
    // { id: 'service', value: "Service" }
  ];
  discountable_idList: any = [];//id of item or service or category
  response: any = [];
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService,
    private cdk: ChangeDetectorRef
    ) {
  }

  ngOnInit(): void {
    if(this.TranslationService.isRTL()){
      this.typeList = [
        { id: 'Item', value: "غرض" },
        { id: 'Service', value: "خدمة" },
        { id: 'Category', value: "فئة" },
        { id: 'shop', value: "محل" },
        { id: 'dealership', value: "وكالة" },
        { id: 'service_center', value: "مركز خدمات" }
      ];
    }
    this.isCreatePage = window.location.href.indexOf("discount-create") !== -1;
    this.isEditPage = window.location.href.indexOf("discount-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("discount-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if(!this.isCreatePage) this.getData();
  }

  typeChange(){
    this.discountable_id = "0";
    this.discountable_idList = [];
    this.cdk.detectChanges();
    if(this.type == "0") return false;
    // 
    this.spinner.show();
    let apiURL = "";
    let extraData = {limit: 1000, page: 1};
    if(this.type == "Item"){
      apiURL = "item/list";
      extraData["status"] = "1";
    }
    else if(this.type == "Service") apiURL = "service";
    else if(this.type == "Category") apiURL = "category/list";
    // 
    else if(this.type == "shop") apiURL = "shop";
    else if(this.type == "dealership") apiURL = "dealership";
    else if(this.type == "service_center") apiURL = "center";
    //
    this.api.getMajorData(extraData,apiURL).subscribe(
      (res) => {
        // 
        this.discountable_idList = res.data.map((resp: any) => {
          const result = {
            id: resp.id || 0,
            value: resp.name || "---"
          };
          return result;
        });
        this.change.detectChanges();
        this.spinner.hide();
        // 
      },
      (err) => {
        this.spinner.hide();
      }
    );    
  }

  getData(){
    this.spinner.show();
    this.api.getDiscountByID(this.id).subscribe(
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
    this.set_all = this.response?.data?.set_all || "0";
    this.type = this.response?.data?.type || "0";
    this.percentage = this.response?.data?.percentage || "1";
    this.typeChange();
    setTimeout(() => {
      this.discountable_id = this.response?.data?.discountable_id || "0";
    });
    // 
    this.expiry_dateFromAPI = this.response?.data?.expiry_date || "";
    this.setDataToPicker();
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  submitForm(form){
    // console.log(this.expiry_date);
    this.spinner.show();
    this.isSubmitted = true;
    if( form.valid && this.checkValue(form.value.percentage) && this.checkDate()){
      const data = new FormData();
      data.append('set_all',form.value.set_all);
      data.append('type',form.value.type);
      data.append('percentage',form.value.percentage);
      data.append('discountable_id',form.value.discountable_id);
      data.append('expiry_date',this.dateToString(form.value.expiry_date));

      if(this.isEditPage){
        data.append('id',this.id);
        data.append('_method','PUT');
        // 
        this.api.editDiscount(data,this.id).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Discount updated successfully." });
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
        this.api.createDiscount(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Discount created successfully." });
            this.shared.redirectTo("/discount");
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

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  checkValue(value){
    if(value > 0)
      return true;
    else
      return false;
  }

  checkDate(){
    return this.expiry_date ? true : false;
  }

  dateToString(d){
    let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let ho = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(d);
    let mi = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(d);
    return `${ye}-${mo}-${da} ${ho}:${mi}`;
  }

  setDataToPicker(){
    let temp_date_time = this.expiry_dateFromAPI;
    if(!temp_date_time) return false;
    // 
    let temp_date_arr = temp_date_time.split(" ");
    let date = temp_date_arr[0];
    let time = temp_date_arr[1];
    // 
    let date_arr = date.split("-");
    let time_arr = time.split(":");
    // 
    this.expiry_date = new Date(parseInt(date_arr[0]), (parseInt(date_arr[1]) - 1), parseInt(date_arr[2]), parseInt(time_arr[0]), parseInt(time_arr[1]));
  }
  
}