import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from '../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-subscription-edit',
  templateUrl: './subscription-edit.component.html',
  styleUrls: ['./subscription-edit.component.scss']
})
export class SubscriptionEditComponent implements OnInit {
  title: string = "";
  description: string = "";
  title_ar: string = "";
  description_ar: string = "";
  duration: string = "";
  price: string = "";
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
    this.isCreatePage = window.location.href.indexOf("subscription-create") !== -1;
    this.isEditPage = window.location.href.indexOf("subscription-edit") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if(!this.isCreatePage) this.getData();
  }

  backPage(){
    this.shared.backToPreviousPage();
  }

  getData(){
    this.spinner.show();
    this.api.getSubscriptionByID(this.id).subscribe(
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
    this.duration = this.response.data.duration;
    this.price = this.response.data.price;
    this.title = this.response.data.title;
    this.description = this.response.data.description;
    this.title_ar = this.response.data.title_ar;
    this.description_ar = this.response.data.description_ar;
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  submitForm(form) {
    this.isSubmitted = true;
    if (form.valid) {
      const data = {
        duration: form.value.duration,
        price: form.value.price,
        title: form.value.title,
        description: form.value.description,
        title_ar: form.value.title_ar,
        description_ar: form.value.description_ar        
      }
      if (this.isEditPage) {
        data["_method"] = "put";
        data["id"]= this.id;
        this.api.editSubscription(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Subscription fees updated successfully." });
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
        this.api.createSubscription(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Subscription fees created successfully." });
            this.shared.redirectTo("/subscription");
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
