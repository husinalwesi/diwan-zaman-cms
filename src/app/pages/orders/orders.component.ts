import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { SharedService } from "../shared/services/shared.service";
import { TranslationService } from "src/app/_metronic/core/services/translation.service";
import { LocalStorage as ls } from '../../utils/localstorage.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  isDeletedPage: boolean;
  search: string = "";
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  // 
  totalResult: number;
  // 
  response: any = [];
  isSubmitted: boolean = false;
  orderStatusList: any = [

    // status
    // pending - approved - rejected
    { id: "pending", value: "Pending" },
    { id: "approved", value: "Approved" },
    { id: "rejected", value: "Rejected" }
  ];
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    // if (this.TranslationService.isRTL()) {
    //   this.orderStatusList = [
    //     { id: -1, value: "ملغي" },
    //     { id: 0, value: "انتظار" },
    //     { id: 1, value: "التعبئة والتغليف" },
    //     { id: 2, value: "جاهز للإستلام" },
    //     { id: 3, value: "خارج للتوصيل" },
    //     { id: 4, value: "تم التوصيل" }
    //   ];
    // }
    // this.isDeletedPage = window.location.href.indexOf("category-deleted") !== -1;
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.api.getOrderList().subscribe(
      (res) => {
        this.response = res.dataObject;
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
      }
    );
  }

  mapData() {
    this.response = this.response.data.map((res: any) => {
      const result = {
        orderID: res.id,
        // customerID: 1,
        customerName: res.name || "---",
        status: res.status || 0,
        purchaseDateTime: res.purchase_date || "---",
        // paymentMethod: "Cash on delivery",//credit card, cash on delivery
        // city: "Amman",
        // location: "https://img5.goodfon.com/wallpaper/nbig/f/4a/spain-map-pin.jpg",//(google map)
        // items: "Oil",
        // servicesPurchased: "Change oil",
        totalAmount: `${res.total} ${(this.TranslationService.isRTL() ? " د.ا" : " JD")}`,
        // detailedReceipt: "First floor"
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;
    this.getData();
  }

  changeOrderStatus(e, orderID, index) {
    let currentValue = e?.target?.value;
    this.response[index].status = currentValue;
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

  getDateTime(date) {
    return new Date(date * 1000).toISOString().slice(0, 19).replace('T', ' ');
    // return new Date(date);
  }

  getPhone(phone) {
    let phoneJson = JSON.parse(phone);
    return phoneJson.internationalNumber;
  }

}
