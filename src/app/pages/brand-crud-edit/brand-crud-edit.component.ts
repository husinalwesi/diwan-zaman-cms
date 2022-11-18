import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { environment } from 'src/environments/environment';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-brand-crud-edit',
  templateUrl: './brand-crud-edit.component.html',
  styleUrls: ['./brand-crud-edit.component.scss']
})
export class BrandCrudEditComponent implements OnInit {
  isSubmitted: boolean = false;
  id: string = "";
  nameEN: string = "";
  nameAR: string = "";
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  response: any;
  image_url: string = environment.defaultImgEle;
  file: any = null;
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
    this.isCreatePage = window.location.href.indexOf("brand-create") !== -1;
    this.isEditPage = window.location.href.indexOf("brand-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("brand-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if(!this.isCreatePage) this.getData();
  }

  getData(){
    this.spinner.show();
    this.api.getBrandByID(this.id).subscribe(
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
    this.image_url = this.response.data.image;
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
      if(this.file) data.append('image', this.file, this.file.name);
      // 
      if(this.isEditPage){
        data.append('id', this.id);
        data.append('_method', "PUT");
        // 
        this.api.editBrand(data,this.id).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Brand updated successfully." });
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
        this.api.addBrand(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Brand created successfully." });
            this.shared.redirectTo("/brand");
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
    console.log(this.file);
  }

}
