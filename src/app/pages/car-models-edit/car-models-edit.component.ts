import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-car-models-edit',
  templateUrl: './car-models-edit.component.html',
  styleUrls: ['./car-models-edit.component.scss']
})
export class CarModelsEditComponent implements OnInit {

  isSubmitted: boolean = false;
  id: string = "";
  nameEN: string = "";
  nameAR: string = "";
  brand: string = "0";
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  response: any;
  brandList: any = [];
  constructor(
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService
    ) {
  }

  ngOnInit(): void {
    this.isCreatePage = window.location.href.indexOf("car-model-create") !== -1;
    this.isEditPage = window.location.href.indexOf("car-model-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("car-model-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if(!this.isCreatePage) this.getData();
    // 
    this.getBrands();
  }

  getData(){
    this.spinner.show();
    this.api.getModelByID(this.id).subscribe(
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
    this.nameEN = this.response.data.name.en,
    this.nameAR = this.response.data.name.ar;
    this.brand = this.response.data.brand_id;
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  submitForm(form){
    this.spinner.show();
    this.isSubmitted = true;
    if(form.valid){
      // 
      let data = new FormData();
      data.append('name', form.value.nameEN);
      data.append('name_ar', form.value.nameAR);
      data.append('brand_id', form.value.brand);
      // 
      if(this.isEditPage){
        data.append('id', this.id);
        data.append('_method', "PUT");
        // 
        this.api.editModel(data,this.id).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Car model updated successfully." });
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
        this.api.addModel(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Car model created successfully." });
            this.shared.redirectTo("/car-models");
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

  // 
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

}
