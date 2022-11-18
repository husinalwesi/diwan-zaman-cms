import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delivery-fees-shop-create',
  templateUrl: './delivery-fees-shop-create.component.html',
  styleUrls: ['./delivery-fees-shop-create.component.scss']
})
export class DeliveryFeesShopCreateComponent implements OnInit {
  delivery: string = "0";
  isSubmitted: boolean = false;
  isCreatePage: boolean = false;
  isEditPage: boolean = false;
  id: string = "";
  response: any;
  shop: string = "0";
  delivery_type: string = "0";
  delivery_typeList: any = [];
  shopList: any = [];

  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private shared: SharedService,
    private route: ActivatedRoute,
    private change: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.isCreatePage = window.location.href.indexOf("delivery-fees-shop-create") !== -1;
    this.isEditPage = window.location.href.indexOf("delivery-fees-shop-edit") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    this.getShopList();
    this.getDeliveryList();
    if(!this.isCreatePage) this.getData();
  }

  getDeliveryList(){
    this.spinner.show();
    this.shopList = [];
    this.api.getDelivery({limit: 1000, page: 1},"delivery").subscribe(
      (res) => {
        // 
        this.delivery_typeList = res.data.map((resp: any) => {
          const result = {
            id: resp.id || 0,
            value: resp.city || "---"
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

  getShopList(){
    this.spinner.show();
    this.shopList = [];
    this.api.getShopData({limit: 1000, page: 1},"shop").subscribe(
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
  

  backPage(){
    this.shared.backToPreviousPage();
  }

  getData(){
    this.spinner.show();
    this.api.getDeliveryByID(this.id).subscribe(
      (res) => {
        // 
        this.response = res;
        this.mapData();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapData(){
    this.shop = this.response.data?.shop || 0;
    this.delivery_type = this.response.data?.delivery_type || 0;
    this.delivery = this.response.data.delivery || 0;
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  submitForm(form) {
    this.isSubmitted = true;
    if (form.valid) {
      const data = {
        delivery: form.value.delivery,
        delivery_id: form.value.delivery_type,
        shop_id: form.value.shop
      }
      if (this.isEditPage) {
        data["_method"] = "put";
        data["id"]= this.id;
        this.api.editDeliveryShop(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Shop Delivery fees updated successfully." });
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
      } else if (this.isCreatePage) {
        this.api.createShopDelivery(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Shop Delivery fees created successfully." });
            this.shared.redirectTo("/delivery-fees-shop");
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
    } else {
      this.spinner.hide();
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  cancelChanges() {
    this.getData();
  }

}
