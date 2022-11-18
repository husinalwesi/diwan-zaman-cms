import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-refund-requests',
  templateUrl: './refund-requests.component.html',
  styleUrls: ['./refund-requests.component.scss']
})
export class RefundRequestsComponent implements OnInit {

  customerName: string = "";
  partName: string = "0";
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  // 
  totalResult: number;
  // 
  response: any = [];
  isSubmitted: boolean = false;
  partNameList: any = [
    { id: 0, value: "-- Select one --" },
    { id: 1, value: "Test" }
  ];
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private shared: SharedService
    ) { }

  ngOnInit(): void {
    // this.isDeletedPage = window.location.href.indexOf("category-deleted") !== -1;
    this.getData();
  }

  getData(){
    this.totalResult = 1;
    this.response = [
      {
        customerName: "Hussein Alwesi",
        orderNumber: 3564,
        partName: "Test",
        returnReason: "Test",
        purchaseDate: "2020-09-15",
        refundRequestDate: "15-09-2020 09:30 PM"
      }
    ];
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;    
    this.getData();
  }

  approveItem(id){

  }

  rejectItem(id){

  }

}
