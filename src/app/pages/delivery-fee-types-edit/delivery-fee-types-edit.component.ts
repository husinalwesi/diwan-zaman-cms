import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-delivery-fee-types-edit',
  templateUrl: './delivery-fee-types-edit.component.html',
  styleUrls: ['./delivery-fee-types-edit.component.scss']
})
export class DeliveryFeeTypesEditComponent implements OnInit {

    delivery_types: string = "0";
    country: string = "";
    fees_value: string = "";
    delivery_typeList: any = [
      {id: 1, value: "per_kilo"},
      {id: 2, value: "per_country"}
    ];

    isSubmitted: boolean = false;
    isCreatePage: boolean = false;
    isEditPage: boolean = false;
    id: string = "";
    response: any;
  
    constructor(
      private TranslationService: TranslationService,
      private api: ApisService,
      private spinner: NgxSpinnerService,
      private alert: AlertService,
      private shared: SharedService,
      private route: ActivatedRoute,
      private change: ChangeDetectorRef
    ) {
    }
  
    ngOnInit(): void {
      if(this.TranslationService.isRTL()){      
        this.delivery_typeList = [
          {id: 1, value: "للكيلو"},
          {id: 2, value: "للمدينه"}
        ];
      }
      this.isCreatePage = window.location.href.indexOf("delivery-fee-types-create") !== -1;
      this.isEditPage = window.location.href.indexOf("delivery-fee-types-edit") !== -1;
      this.id = this.route.snapshot.paramMap.get('id');
      // 
      if(!this.isCreatePage) this.getData();
    }
  
    backPage(){
      this.shared.backToPreviousPage();
    }
  
    getData(){
      this.spinner.show();
      this.api.getDeliveryFeeNewById(this.id).subscribe(
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
      this.delivery_types = this.response.data?.type || 0;
      this.country = this.response.data?.country || "";
      this.fees_value = this.response.data.fees || 0;
      // 
      this.change.detectChanges();
      this.spinner.hide();
    }
  
    submitForm(form) {
      this.isSubmitted = true;
      if (form.valid) {
        const data = {
          type: form.value.delivery_types,
          country: form.value.country || null,
          fees: form.value.fees_value
        }

        this.api.addEditDeliveryFeeNew(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Delivery fee created/edited successfully." });
            this.shared.redirectTo("/delivery-fee-types");
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

      } else {
        this.spinner.hide();
        this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
      }
    }
  
    cancelChanges() {
      this.getData();
    }
  
    typesChange(){
      this.country = "";
    }

  }
  