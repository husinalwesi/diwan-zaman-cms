import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { ActivatedRoute } from "@angular/router";
import { SharedService } from "../shared/services/shared.service";
import { environment } from "src/environments/environment";
import { TranslationService } from "src/app/_metronic/core/services/translation.service";
import { parse, stringify } from 'lossless-json'

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  response: any = {};
  id: number = 0;
  defaultImg: string = environment.defaultImg;
  orderStatusList: any = [
    { id: -1, value: "Canceled" },
    { id: 0, value: "Pending" },
    { id: 1, value: "Delivered" }
  ];
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private shared: SharedService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.TranslationService.isRTL()) {
      this.orderStatusList = [
        { id: -1, value: "ملغي" },
        { id: 0, value: "انتظار" },
        { id: 1, value: "مستلم" }
      ];
    }
    this.id = parseInt(this.route.snapshot.paramMap.get('ID'));
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.api.getOrderDetails(this.id).subscribe(
      (res) => {
        this.response = res.dataObject;
        this.response.productsJSON = parse(this.response.products); // {foo: 'bar'}
        // console.log(this.response.productsJSON);
        
        // console.log(this.response);

        // console.log(json);

        // console.log(this.response.products);
        // console.log(JSON.parse(this.response.products));

        // this.response.products = JSON.parse(this.response.products);
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
      }
    );
  }

  // getData(){
  //   this.spinner.show();
  //   this.response = {};
  //   this.api.getOrderDetails(this.id).subscribe(
  //     (res) => {
  //       this.response = res.data;
  //       this.change.detectChanges();
  //       this.spinner.hide();
  //     },
  //     (err) => {
  //     }
  //   );
  // }

  // changeOrderStatus(orderID,newStatus){
  //   this.spinner.show();
  //   this.api.changeOrderStatus(orderID,newStatus).subscribe(
  //     (res) => {
  //       this.alert.success({title: "Order status is changed successfully."});
  //       this.spinner.hide();
  //       this.change.detectChanges();
  //     },
  //     (err) => {
  //       this.spinner.hide();
  //       console.log(err);
  //     }
  //   );
  // }

  backPage() {
    this.shared.redirectTo("orders")
  }

  getTotalItemsCounter() {
    let items = this.response?.productsJSON;
    let counter = 0;
    for (let index = 0; index < items.length; index++) {
      counter += +items[index].counter.value;
    }
    return counter;
  }

  getTotalItemsAmount() {
    let items = this.response?.productsJSON;
    let total = 0;
    for (let index = 0; index < items.length; index++) {
      let counter = +items[index].counter.value;
      let price = items[index].selection ? +items[index].selection.price : +items[index].data.price;
      total += counter * price;
    }
    return total;
  }

}
