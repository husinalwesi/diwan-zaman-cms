import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { environment } from 'src/environments/environment';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.scss']
})
export class ServicesEditComponent implements OnInit {
  name_en: string = "";
  name_ar: string = "";
  description: string = "";
  description_ar: string = "";
  price: string = "0";
  estimated_hours: string = "0";
  isSubmitted: boolean = false;
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  id: string = "";
  response: any;
  image_url: string = environment.defaultImgEle;
  file: any = null;
  // 
  category: string = "0";
  typeSelect: string = "0";
  typeID: string = "0";
  // 
  categoryList: any = []; //id value  
  typeSelectList: any = [
    {id:2, value:"Dealership"},
    {id:4, value:"Local Service Center"}
  ];
  typeIDList: any = [];

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
      this.typeSelectList = [
        {id:2, value:"وكالة"},
        {id:4, value:"مركز الخدمة المحلي"}
      ];
    }
    this.isCreatePage = window.location.href.indexOf("services-create") !== -1;
    this.isEditPage = window.location.href.indexOf("services-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("services-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    this.getMainCategoryList();
    if(!this.isCreatePage) this.getData();
  }

  getMainCategoryList(){
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
    this.api.getServiceByID(this.id).subscribe(
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
    this.image_url = this.response?.data?.image || environment.defaultImg;
    this.description = this.response?.data?.description?.en || "";
    this.description_ar = this.response?.data?.description?.en || "";
    this.price = this.response?.data?.price || 0;
    this.estimated_hours = this.response?.data?.estimated_hours || 0;
    // 
    this.category = this.response?.data?.category_id || 0;
    this.typeSelect = this.response?.data?.type || 0;
    this.typeID = this.response?.data?.type_id || 0;
    this.onTypeChange();
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  submitForm(form){
    this.spinner.show();
    this.isSubmitted = true;
    if(form.valid){
      const data = new FormData();
      data.append('name',form.value.name_en);
      data.append('name_ar',form.value.name_ar);
      data.append('description',form.value.description);
      data.append('description_ar',form.value.description_ar);
      data.append('price',form.value.price);
      data.append('estimated_hours',form.value.estimated_hours);
      // 
      if(form.value.category != 0) data.append('category_id',form.value.category);
      // data.append('category_id',form.value.category != 0 ? form.value.category : null);
      data.append('type',form.value.typeSelect);
      data.append('type_id',form.value.typeID);
      // 
      if(this.file) data.append('image', this.file, this.file.name);
      // 
      if(this.isEditPage){
        data.append('id',this.id);
        data.append('_method','PUT');
        // 
        this.api.editService(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Service updated successfully." });
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
        this.api.addService(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Service created successfully." });
            this.shared.redirectTo("/services");
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

  selectFileEmiter(e){
    this.file = e.file;
  }

  cancelChanges(){
    this.getData();
  }

  onTypeChange(){
    this.typeIDList = [];
    if(this.typeSelect == "2"){//Dealership
      this.getDealerShipData();
    }else if(this.typeSelect == "4"){//Local Service Center
      this.getLocalServiceCenter();      
    }    
  }

  getLocalServiceCenter(){
    this.spinner.show();
    this.api.getDealershipList({ page: 1, limit: 1000 },"center").subscribe(
      (res) => {
          this.typeIDList = res.data.map((res: any) => {
            const result = {
              id: res.id,
              value: res.name || "---"
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

  getDealerShipData(){
    this.spinner.show();
    this.api.getDealershipList({ page: 1, limit: 1000 },"dealership").subscribe(
      (res) => {
          this.typeIDList = res.data.map((res: any) => {
            const result = {
              id: res.id,
              value: res.name || "---"
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

}
