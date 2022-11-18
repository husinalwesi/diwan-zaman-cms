import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { environment } from 'src/environments/environment';
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../pages/shared/services/shared.service';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.scss']
})
export class AdminEditComponent implements OnInit {
  // 
  response: any;
  responseRolesList: any = [];
  formattedResponseRolesList: any = [];
  // 
  isSubmitted: boolean = false;
  id: string = "";
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  role: string = "0";
  email: string = "";
  name: string = "";
  password: string = "";
  phone_number: string = "";

  constructor(private api: ApisService, private change: ChangeDetectorRef, private spinner: NgxSpinnerService, private alert: AlertService, private route: ActivatedRoute, private shared: SharedService) {
  }

  ngOnInit(): void {
    this.isCreatePage = window.location.href.indexOf("admin-create") !== -1;
    this.isEditPage = window.location.href.indexOf("admin-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("admin-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    this.getRolesListData();
    // 
    if(!this.isCreatePage) this.getData();
  }

  getRolesListData(){
    this.spinner.show();
    this.api.getPermissionsList({ page: 1, limit: 1000 }).subscribe(
      (res) => {
        // 
        this.responseRolesList = res;
        this.mapRolesData();
        this.change.detectChanges();
      },
      (err) => {
        // 
        this.spinner.hide();
      }
    );    
  }

  getData(){
    this.spinner.show();
    this.api.getAdminByID(this.id).subscribe(
      (res) => {
        // 
        this.response = res;
        this.mapData();
        this.change.detectChanges();
      },
      (err) => {
        // 
        this.spinner.hide();
      }
    );
  }

  mapRolesData(){
    this.formattedResponseRolesList = this.responseRolesList.data.data.map((res: any) => {
      const result = {
        id: res.id || 0,
        name: res.name || "---"
      };
      return result;
    });    
    // 
    this.change.detectChanges();
    this.spinner.hide();    
  }

  mapData(){
    this.role = this.response.data.roles[0]?.id || 0;
    this.email = this.response.data.email || "";
    this.name = this.response.data.name || "";
    // this.password = this.response.data.password || "";
    this.phone_number = this.response.data.phone_number || "";
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }  

  cancelChanges(){
    this.mapData();
  }

  submitForm(form){
    this.spinner.show();
    this.isSubmitted = true;
    if(form.valid && form.value.role !="0"){
      // 
      const data = new FormData();
      data.append("email",form.value.email);
      data.append("role",form.value.role);
      data.append("name",form.value.name);
      data.append("password",form.value.password);
      data.append("phone_number",form.value.phone_number);
      // 
      if(this.isEditPage){
        data.append("id",this.id);
        data.append("_method","put");
        // 
        this.api.editAdmin(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: 'SHARED.ACCOUNT_UPDATED_SUCCESSFULLY' });
            this.spinner.hide();
            this.getData();
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
        // 
        // data["email"] = form.value.email;
        // 
        this.api.createAdmin(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: 'SHARED.ACCOUNT_CREATED_SUCCESSFULLY' });
            this.spinner.hide();
            this.shared.redirectTo("/admins");
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
    this.shared.backToPreviousPage();
  }

}
