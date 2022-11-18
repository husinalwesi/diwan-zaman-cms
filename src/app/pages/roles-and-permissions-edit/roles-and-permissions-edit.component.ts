import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-roles-and-permissions-edit',
  templateUrl: './roles-and-permissions-edit.component.html',
  styleUrls: ['./roles-and-permissions-edit.component.scss']
})
export class RolesAndPermissionsEditComponent implements OnInit {
  isSubmitted: boolean = false;
  id: string = "";
  title: string = "";
  permissionList: any = [];
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  response: any;

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
    this.isCreatePage = window.location.href.indexOf("roles-and-permissions-create") !== -1;
    this.isEditPage = window.location.href.indexOf("roles-and-permissions-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("roles-and-permissions-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    this.getRolesList();
  }

  getRolesList(){
    this.spinner.show();
    this.api.getRolesList().subscribe(
      (res) => {
        if(res.total){
          this.permissionList = res;
          this.mapPermissionData();
        }else{
          this.permissionList = [];
          this.spinner.hide();
        }
        this.change.detectChanges();
        if(!this.isCreatePage) this.getData();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapPermissionData(){
    this.permissionList = this.permissionList.data.data.map((res: any) => {
      const result = {
        id: res.id,
        title: res.name,
        isChecked: false
      };
      return result;
    });
    this.spinner.hide();
  }

  getData(){
    this.spinner.show();
    this.api.getRoleByID(this.id).subscribe(
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
    this.title = this.response.role.name;
    // 
    for (let index = 0; index < this.response.permission.length; index++) {
      this.checkPermissionIsChecked(this.response.permission[index].id);
    }
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  checkPermissionIsChecked(id){
    for (let index = 0; index < this.permissionList.length; index++) {
      if(this.permissionList[index].id == id){
        this.permissionList[index].isChecked = true;
        break;
      }
    }
  }

  submitForm(form){
    this.spinner.show();
    this.isSubmitted = true;
    if(form.valid && this.checkIfAtLeastOneIsSelected()){
      
      let selectedPermissionList = this.getSelectedPermissionList();
      const data = new FormData();
      data.append('name',form.value.title);
      // 
      for (let i = 0; i < selectedPermissionList.length; i++) {
        data.append(`permission[${i}]`, selectedPermissionList[i]);
      }
      // 
      if(this.isEditPage){
        data.append('id',this.id);
        data.append('_method','PUT');
        // 
        this.api.editRole(data,this.id).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Role & Permissions Updated successfully." });
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
        this.api.addRole(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: res.message });
            this.shared.redirectTo("/roles-and-permissions");
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

  checkIfAtLeastOneIsSelected(){
    for (let index = 0; index < this.permissionList.length; index++) {
      if(this.permissionList[index].isChecked) return true;
    }
    return false;
  }

  getSelectedPermissionList(){
    let temp = [];
    for (let index = 0; index < this.permissionList.length; index++) {
      if(this.permissionList[index].isChecked) temp.push(this.permissionList[index].id);
    }
    return temp;
  }


  changeCheckBox(item){
    // {id: 75, title: 'subscription-create', isChecked: false}
    item.isChecked = !item.isChecked;
    // after change..
    // if(item.title == "xxxx"){
    //   if(item.isChecked){//true

    //   }else{//false

    //   }
    // }

  }

}
