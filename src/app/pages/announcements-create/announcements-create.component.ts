import { map } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../pages/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-announcements-create',
  templateUrl: './announcements-create.component.html',
  styleUrls: ['./announcements-create.component.scss']
})
export class AnnouncementsCreateComponent implements OnInit {
  response: any;
  responseItems: any = [];
  isSubmitted: boolean = false;
  isCreatePage: boolean = false;
  isEditPage: boolean = false;
  isViewPage: boolean = false;

  via_email: boolean = false;
  via_notifications: boolean = false;

  id: string = "0";
  item_id: string = "0";
  // 
  title: string = "";
  text: string = "";
  // 


  itemList: any = [];
  shopList: any = [];
  shop: string = "0";
  type: string = "1";
  constructor(
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService,
    private api: ApisService
  ) { }

  ngOnInit(): void {
    this.isCreatePage = window.location.href.indexOf("announcements-create") !== -1;
    this.isEditPage = window.location.href.indexOf("announcements-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("announcements-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    //
    if (this.isCreatePage) this.getItemsData();
    else this.getData();
  }

  getItemsData() {
    this.spinner.show();
    this.itemList = [];
    // this.api.getItemsList({ limit: 1000 }, "item/list").subscribe(
    //   (res) => {
    //     // 
    //     if (res?.total) {
    //       this.itemList = res;
    //       this.mapItemsData();
    //     } else {
    //       this.itemList = [];
    //       this.spinner.hide();
    //     }
    //     this.change.detectChanges();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   }
    // );
  }

  mapItemsData() {
    this.itemList = this.itemList.data.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name || "---"
      };
      return result;
    });
    this.spinner.hide();
  }

  getData(from?) {
    this.spinner.show();
    this.api.getBannerByID(this.id).subscribe(
      (res) => {
        // 
        this.response = res;
        this.mapData();
        if (from !== 'update')
          // this.getFilter();
          this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        // 
      }
    );
  }

  getShopList() {
    this.spinner.show();
    this.shopList = [];
    this.api.getShopData({ limit: 1000, page: 1 }, "shop").subscribe(
      (res) => {
        // 
        this.shopList = res.data.map((resp: any) => {
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

  mapData() {
    this.title = this.response.data.title;
    this.text = this.response.data.text;
    // 
    if (this.type == "1") this.getItemsData();
    else this.getShopList();

    setTimeout(() => {
      if (this.type == "1") this.item_id = this.response.data.type_id;
      else this.shop = this.response.data.type_id;
    });
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }
  handleType() {
    if (this.type == "1" && this.item_id != "0") return true;
    else if (this.type == "5" && this.shop != "0") return true;
    return false;
  }

  submitForm(form) {
    this.isSubmitted = true;
    if (form.valid && this.handleType()) {
      this.spinner.show();

      let data = {
        title: form.value.title,
        text: form.value.text,
        via_email: true,
        via_notifications: false,
        item_id: this.type == "1" ? this.item_id : this.shop
      };

      data["type"] = this.type;

      if (this.type == "1") data["type_id"] = this.item_id;
      else data["type_id"] = this.shop;

      this.api.createAnnouncements(data).subscribe(
        (res) => {
          this.alert.success({ title: 'Announcements created successfully.' });
          this.shared.redirectTo("announcements");
          // 
          this.spinner.hide();
        },
        (err) => {
          // 
          this.alert.errorAPI(err.error.errors);
          this.spinner.hide();
          // 
        }
      );
    } else {
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  backPage() {
    this.shared.backToPreviousPage();
  }

  cancelChanges() {
    this.mapData();
  }

  changeType() {
    if (this.type == '1') {//items
      this.getItemsData();
    } else {//shop
      this.getShopList();
    }
  }

}
