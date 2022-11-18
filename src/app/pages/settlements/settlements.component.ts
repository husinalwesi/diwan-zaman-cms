import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { SharedService } from "../shared/services/shared.service";
import { TranslationService } from "src/app/_metronic/core/services/translation.service";
import { IDateRangePickerOptions } from "ngx-daterange";
import { ExportToExcelService } from "../shared/services/export-to-excel.service";

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.scss']
})
export class SettlementsComponent implements OnInit {
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  dateFrom: string = "";
  dateTo: string = "";
  // 
  checkedlist: any = [];
  client: string = "0";
  clientList: any = [];
  // checkedlist: any = [ { "id": 4, "order": 38, "commission_amount": "0.00", "seller": "Mohammad Hayajneh", "payment_method": "cash", "status": 0, "purchase_date": "2021-07-14T12:00:14.000000Z" }, { "id": 3, "order": 39, "commission_amount": "0.00", "seller": "Mohammad Hayajneh", "payment_method": "cash", "status": 0, "purchase_date": "2021-07-14T12:05:03.000000Z" } ];

  // 
  paymentStatus: string = "all";
  paymentStatusList: any = [
    {id: "all", value: "-- All --"},
    // {id: "all", value: "-- Select one --"},
    {id: "1", value: "Paid"},
    {id: "0", value: "Not Paid"},
  ];
  totalResult: number;
  // 
  response: any;
  isSubmitted: boolean = false;

  options: IDateRangePickerOptions = {
    autoApply: false,
    clickOutsideAllowed: false,
    format: 'MM/DD/YYYY',
    // icons: 'font-awesome',
    // minDate: moment().subtract(10, 'years'),
    // maxDate: moment().add(1, 'year'),
  }

  type: string = "0";
  discountable_id: string = "0";
  typeList: any = [
  // { id: 'Item', value: "Item" },
  // { id: 'Service', value: "Service" },
  // { id: 'Category', value: "Category" },
  { id: 'shop', value: "Shop" },
  { id: 'dealership', value: "Dealership" },
  { id: 'service_center', value: "Service Center" },
  // { id: 'service', value: "Service" }
  ];  
  discountable_idList: any = [];//id of item or service or category
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private shared: SharedService,
    private excelService: ExportToExcelService,
    private cdk: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    if(this.TranslationService.isRTL()){      
      this.typeList = [
        // { id: 'Item', value: "غرض" },
        // { id: 'Service', value: "خدمة" },
        // { id: 'Category', value: "فئة" },
        { id: 'shop', value: "محل" },
        { id: 'dealership', value: "وكالة" },
        { id: 'service_center', value: "مركز خدمات" }
      ];      
      this.paymentStatusList = [
        {id: "all", value: "-- الجميع --"},
        // {id: "all", value: "-- Select one --"},
        {id: "1", value: "مدفوع"},
        {id: "0", value: "غير مدفوع"},
      ];
    }    
    this.getClients();
    this.getData();
  }

  typeChange(){
    this.discountable_id = "0";
    this.discountable_idList = [];
    this.cdk.detectChanges();
    if(this.type == "0") return false;
    // 
    this.spinner.show();
    let apiURL = "";
    if(this.type == "Item") apiURL = "item/list";
    else if(this.type == "Service") apiURL = "service";
    else if(this.type == "Category") apiURL = "category/list";
    // 
    else if(this.type == "shop") apiURL = "shop";
    else if(this.type == "dealership") apiURL = "dealership";
    else if(this.type == "service_center") apiURL = "center";
    //
    this.api.getMajorData({limit: 1000, page: 1},apiURL).subscribe(
      (res) => {
        // 
        this.discountable_idList = res.data.map((resp: any) => {
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

  filterBy(){
    this.currentPage = 1;
    this.getData();
  }

  getClients(){
    this.clientList = [];
    this.spinner.show();
    this.api.getShopData({ page: 1, limit: 1000 },"shop").subscribe(
      (res) => {
        this.clientList = res;
        this.mapShopsData();
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );    
  }

  mapShopsData(){
    this.clientList = this.clientList.data.map((res: any) => {
      const result = {
        id: res.id || 0,
        value: res.name || "---"
      };
      return result;
    });
    this.spinner.hide();    
  }

  getData(){
    this.spinner.show();
    let data = {
        page: this.currentPage,
        limit: this.perPage
      };
    if(this.paymentStatus != "all") data["status"] = this.paymentStatus;
    // 
    if(this.type != "0"){

      if(this.type == "shop"){
        data["type"] = 1;
      }else if(this.type == "dealership"){
        data["type"] = 2;
      }else if(this.type == "service_center"){
        data["type"] = 3;
      }

      data["type_id"] = this.discountable_id;
    }
    
    // 
    if(this.dateFrom && this.dateTo){
      data["date_from"] = this.dateFrom;
      data["date_to"] = this.dateTo;
    }

    this.api.getSettlements(data).subscribe(
      (res) => {
        this.totalResult = res?.total || 0;        
        this.pages = Math.ceil(this.totalResult / this.perPage);
        if (!this.pages) this.pages = 1;  
        // 
        if(this.totalResult){
          this.response = res;
          this.mapData();
        }else{
          this.response = [];
          this.spinner.hide();
        }
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapData(){
    this.response = this.response?.data.map((res: any) => {
      const result = {
        id: res.id || 0,
        order: res.order || 0,
        commission_amount: res.commission_amount || 0,
        seller: res.seller || "---",
        payment_method: res.payment_method || "---",
        // status: 1,
        status: res.status || 0,
        purchase_date: res.purchase_date || "---"
      };
      return result;
    });
    this.spinner.hide();
  }

  updateAsPaid(settlements_id){
    this.spinner.show();
    // 
    // var data = new FormData();
    // data.append("id[0]", settlements_id);
    let data = {
      'id[0]': parseInt(settlements_id)
    };
    // data.append("id[1]", "2");
    // let idArr = []; 
    // idArr[0] = settlements_id;
    // let data = {"id": idArr};
    // let data = {
    //   "id[0]": settlements_id
    // };
    // console.log(data);
    // 
    this.api.updateSettlement(data).subscribe(
      (res) => {
        //
        this.spinner.hide();
        this.alert.success({title: "Settlement Updated successfully."});
        this.getData();
        // 
      },
      (err) => {        
        this.spinner.hide();
        this.alert.error({title: err.error.data});
      }
    );    
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  datepickerReset(evt){
    this.dateFrom = "";
    this.dateTo = "";
    this.getData();    
  }

  onRangeSelected(evt){
    this.dateFrom = this.formatDate(evt.start._d);
    this.dateTo = this.formatDate(evt.end._d);
    this.getData();
  }

  formatDate(d) {
    let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
    // 2021-11-23
  }

  toggleCheckList(item){
    if(this.checkIfExist(item)){
      this.checkedlist = this.shared.removeFromArrayByIndex(this.checkedlist,this.returnIndexOf(item));
    }else{
      this.checkedlist.push(item);
    }
    this.change.detectChanges();
  }

  checkIfExist(item){
    for (let index = 0; index < this.checkedlist.length; index++) {
      if(this.checkedlist[index].id == item.id) return true;
    }
    return false;
  }

  returnIndexOf(item){
    for (let index = 0; index < this.checkedlist.length; index++) {
      if(this.checkedlist[index].id == item.id) return index;
    }
    return 0;
  }

  updateAllAsPaid(){
    console.log(this.checkedlist);
  }

  exportToExcel(){
    let table = this.response.map((res: any) => {
      const result = {
        'Order ID': res.order,
        'Commission Amount': res.commission_amount,
        'Seller': res.seller,
        'Payment Method': res.payment_method,
        'Status': res.status == '1' ? 'Paid' : 'Not Paid',
        'Purchase Date': this.formateDate(res.purchase_date)
      };
      return result;
    });
    table.push({
      'Order ID': 'Total',
      'Commission Amount': this.getTotalOfColomn('commission_amount'),
      'Seller': '',
      'Payment Method': '',
      'Status': '',
      'Purchase Date': ''
    });
    this.excelService.exportAsExcelFile(table, 'settlements');
  }

  formateDate(date){
    if(date.indexOf("T") !== -1 && date.indexOf(".") !== -1){
      let date_arr = date.split("T");
      let time_arr = date_arr[1].split(".");    
      return date_arr[0] + " " + time_arr[0];
    }
    return date;
  }

  getTotalOfColomn(key){
    let count = 0;
    for (let index = 0; index < this.response.length; index++) {
      count+=parseFloat(this.response[index][key]);
    }
    return count;
  }

}
