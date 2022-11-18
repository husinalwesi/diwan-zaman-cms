import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { ActivatedRoute } from "@angular/router";
import { SharedService } from "../shared/services/shared.service";
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {
  isDeletedPage: boolean;
  response: any;
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 6;
  // 
  search: string = "";
  // 
  isToggle: boolean = false;
  // 
  isThereData: boolean = false;
  isUserSearch: boolean = false;
  userType: string = "1";
  userTypeList: any = [
    { id: 1, name: "Admin" },//send it as 1
    { id: 2, name: "Users" }//donot send it
  ];

  constructor(
    private alert: AlertService,
    private api: ApisService,
    private TranslationService: TranslationService,    
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.isDeletedPage = (window.location.href.indexOf("admins-deleted") !== -1) || (window.location.href.indexOf("users-deleted") !== -1);
    this.isUserSearch = window.location.href.indexOf("users") !== -1;
    // console.log(this.isUserSearch);
    
    // users
    this.getData();

    if(this.TranslationService.isRTL()){      
      this.userTypeList = [
        { id: 1, name: "آدمن" },
        { id: 2, name: "مستخدم" }
      ];
    }

  }

  deleteUser(id){
    this.spinner.show();
    this.api.DeleteAdmin(id).subscribe(
      (res) => {
        //
          this.spinner.hide();
          this.alert.success({title: "Admin Deleted successfully."});
          this.getData();
        // 
      },
      (err) => {
        // 
        this.spinner.hide();
      }
    );
  }

  restoreUser(id){
    this.spinner.show();
    this.api.restoreAdmin(id).subscribe(
      (res) => {
        //
          this.spinner.hide();
          this.alert.success({title: "Admin Restored successfully."});
          this.getData();
        // 
      },
      (err) => {
        // 
        this.spinner.hide();
      }
    );
  }

  submitForm(form){
    this.currentPage = 1;
    this.getData();
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
      
      if(!this.isUserSearch) data["admins"] = 1;
      // 
      if(this.search !== undefined && this.search != "") data["name"] = this.search;
      // 
    let path = this.isDeletedPage ? "user/deleted" : "user";
    this.api.getAdminList(data,path).subscribe(
      (res) => {
        // 
        this.pages = Math.ceil(res.total / this.perPage);
        if (!this.pages) this.pages = 1;
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
    this.response = this.response.data.map((res: any) => {
      const result = {
        id: res.id,
        email: res.email || "---",
        role: res?.role[0] && res?.role[0]?.name ? res?.role[0]?.name : "---",
        name: res.name || "---",
        phone_number: res.phone_number || "---",
        created_at: res.created_at ? res.created_at.split("T")[0] : "---"
      };
      return result;
    });
    this.isThereData = this.response.length ? true : false;
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

}