import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../shared/services/apis.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-commissions-edit',
  templateUrl: './commissions-edit.component.html',
  styleUrls: ['./commissions-edit.component.scss']
})
export class CommissionsEditComponent implements OnInit {
  id: string = "";
  commissions: string = "";
  isSubmitted: boolean= false;
  isCreatePage: boolean = false;
  isEditPage: boolean = false;
  isViewPage: boolean = false;
  categoryList: any = [];
  category: string = "0";
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.isCreatePage = window.location.href.indexOf("commission-create") !== -1;
    this.isEditPage = window.location.href.indexOf("commission-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("commission-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    this.getCategorylist()
    if(this.isEditPage)
      this.getData();
  }


  cancelChanges(){
    this.getData();
  }
  
  getCategorylist(){
    this.spinner.show();
    this.api.getCategorylist().subscribe(
      (res) => {
        this.categoryList = res.data
        this.spinner.hide();
        
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }
  getData(){
    this.spinner.show();
    this.api.getCommissionByID(this.id).subscribe(
      (res) => {
        this.commissions = res.data.percentage,
        this.category = res.data.category_id
        this.spinner.hide();
        
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  submitForm(form){
    this.spinner.show();
    this.isSubmitted = true;
    if(form.valid && this.checkValue(form.value.commissions)){
      // 
      const data = {
        percentage: form.value.commissions,
        category_id: form.value.category,
      }
      // 
      if(this.isEditPage){
        data["id"] =  this.id;
        data["_method"] =  "PUT";
        // 
        this.api.editCommission(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({title: "Commission updated successfully."});
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
        this.api.createCommission(data).subscribe(
          (res) => {
            //
            this.alert.success({title: "Commission Added successfully."});
            this.shared.redirectTo("/commission");
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

  backPage(){
    this.shared.redirectTo("/commission");
  }

  checkValue(value){
    if(value >= 0)
      return true;
    else
      return false;
  }

}
