import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';

@Component({
  selector: 'app-roles-and-permissions',
  templateUrl: './roles-and-permissions.component.html',
  styleUrls: ['./roles-and-permissions.component.scss']
})
export class RolesAndPermissionsComponent implements OnInit {
  search: string = "";
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  // 
  totalResult: number;
  // 
  response: any;
  isSubmitted: boolean = false;
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    if(this.search) data["search"] = this.search;
    this.api.getPermissionsList(data).subscribe(
      (res) => {
        this.totalResult = res.total;
        this.pages = Math.ceil(this.totalResult / this.perPage);
        if (!this.pages) this.pages = 1;
        // 
        this.response = res;
        this.mapData();
        this.change.detectChanges();
      },
      (err) => {
      }
    );
  }

  mapData(){    
    this.response = this.response.data.data.map((res: any) => {
      let permissionList = ["Permission 1","Permission 2","Permission 3","Permission 4","Permission 5"];
      const result = {
        id: res.id,
        roleName: res.name || "---",
        permissions: permissionList ? permissionList.join() : "---",
        permissions_mini: this.getLimittedPermissionList(permissionList) || "---"
      };
      return result;
    });
    this.spinner.hide();
  }

  getLimittedPermissionList(permissionList){
    let temp = "";
    let moreDots = permissionList[3] ? "..." : "";
    if(permissionList[0]) temp+= permissionList[0] + ",";
    if(permissionList[1]) temp+= permissionList[1] + moreDots;
    // 
    return temp;
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  deleteRole(id){
    this.spinner.show();
    this.api.deleteRole(id).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Role & Permissions Deleted successfully."});
        this.getData();
        // 
      },
      (err) => {        
        this.spinner.hide();
        this.alert.error({title: err.error.message});
      }
    );    
  }

}
