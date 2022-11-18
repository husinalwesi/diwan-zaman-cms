import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "src/environments/environment";
import { LocalStorage as ls } from "../../utils//localstorage.service";
import { AlertService } from "src/app/_metronic/core/services/alert.service";
import { SharedService } from "../shared/services/shared.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  response: any;
  orderResponse: any;
  usersList: any = [];
  orderStatusList: any = [

    // status
    // pending - approved - rejected
    { id: "pending", value: "Pending" },
    { id: "approved", value: "Approved" },
    { id: "rejected", value: "Rejected" }
  ];
  storesList: any = [];
  totaBarter: number;
  list: any = []
  constructor(
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.getData();
    this.getOrders();
  }

  getDateTime(date) {
    return new Date(date * 1000).toISOString().slice(0, 19).replace('T', ' ');
    // return new Date(date);
  }

  getOrders() {
    this.spinner.show();
    this.api.getOrderList().subscribe(
      (res) => {
        this.orderResponse = res.dataObject;
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
      }
    );
  }

  getData() {
    this.spinner.show();
    let data;
    this.api.getDashboardData(data).subscribe(
      (res) => {
        // 
        this.response = res.dataObject;
        this.mapData()
        this.spinner.hide();
        // 
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  mapData() {
    let data = this.response;
    this.list = [
      {
        name: "total orders counter",
        value: data.total_orders_counter,
        icon: "fa fa-home"
      },
      {
        name: "pending orders",
        value: data.pending_orders,
        icon: "fa fa-home"
      },
      {
        name: "approved orders",
        value: data.approved_orders,
        icon: "fa fa-home"
      },
      {
        name: "rejected orders",
        value: data.rejected_orders,
        icon: "fa fa-home"
      },
      // {
      //   name: "categories counter",
      //   value: data.categories_counter,
      //   icon: "fa fa-home"
      // },
      // {
      //   name: "products counter",
      //   value: data.products_counter,
      //   icon: "fa fa-home"
      // },
      // {
      //   name: "special items counter",
      //   value: data.special_items_counter,
      //   icon: "fa fa-home"
      // },

      // {
      //   name: "units counter",
      //   value: data.units_counter,
      //   icon: "fa fa-home"
      // },
      // {
      //   name: "pickup orders counter",
      //   value: data.pickup_delivery_method_counter,
      //   icon: "fa fa-home"
      // },
      // {
      //   name: "delivery orders counter",
      //   value: data.delivery_delivery_method_counter,
      //   icon: "fa fa-home"
      // },

    ];
    // this.usersList = this.response.data.latest_users.map(res =>{
    //   const result = {
    //     image: res.avatar || environment.defaultImg,
    //     name: res.first_name + " " + res.last_name || '---',
    //     date: res.created_at,
    //     status : res.status == 1 ? true : false,
    //     statusText: res.status == 1 ? "Active" : "Pending"
    //   }
    //   return result;
    // })
    // this.storesList = this.response.data.latest_stores.map(res =>{
    //   const result = {
    //     image: res.logo_image || environment.defaultImg,
    //     name: res.title || '---',
    //     date: res.created_at,
    //     status : res.status == 1 ? true : false,
    //     statusText: res.status == 1 ? "Open" : "Closed"
    //   }
    //   return result;
    // })
  }

  changeOrderStatus(e, orderID, index) {
    // console.log(orderID, e?.target?.value);

    let currentValue = e?.target?.value;
    this.orderResponse[index].status = currentValue;
    //
    this.spinner.show();
    this.api.changeOrderStatus(orderID, currentValue, ls.getValue('currentUser').userID).subscribe(
      (res) => {
        this.alert.success({ title: "Order status is changed successfully." });
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  getPhone(phone) {
    let phoneJson = JSON.parse(phone);
    return phoneJson.internationalNumber;
  }

}
