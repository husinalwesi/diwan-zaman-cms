import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delivery-fees-edit',
  templateUrl: './delivery-fees-edit.component.html',
  styleUrls: ['./delivery-fees-edit.component.scss']
})
export class DeliveryFeesEditComponent implements OnInit {
  city: string = "";
  // delivery: string = "0";
  isSubmitted: boolean = false;
  isCreatePage: boolean = false;
  isEditPage: boolean = false;
  id: string = "";
  response: any;
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
    this.isCreatePage = window.location.href.indexOf("delivery-fees-create") !== -1;
    this.isEditPage = window.location.href.indexOf("delivery-fees-edit") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if(!this.isCreatePage) this.getData();
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
    this.city = this.response.data.city;
    // this.delivery = this.response.data?.delivery || 0;
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  submitForm(form) {
    this.isSubmitted = true;
    if (form.valid) {
      const data = {
        city: form.value.city,
        // delivery: form.value.delivery,
        // shop: form.value.shop
      }
      if (this.isEditPage) {
        data["_method"] = "put";
        data["id"]= this.id;
        this.api.editDelivery(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Delivery fees updated successfully." });
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
        this.api.createDelivery(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Delivery created updated successfully." });
            this.shared.redirectTo("/delivery-fees");
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
