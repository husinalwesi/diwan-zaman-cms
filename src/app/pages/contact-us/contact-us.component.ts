import { AlertService } from '../../_metronic/core/services/alert.service';
import { SharedService } from '../shared/services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from '../shared/services/apis.service';
import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  data: any = [];
  phone: string = "";
  email: string = "";
  facebook: string = "";
  instagram: string = "";
  whatsapp: string = "";
  youtube: string = "";
  twitter: string = "";
  isSubmitted: boolean = false;
  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private cd: ChangeDetectorRef,
    private shared: SharedService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.spinner.show();
    this.api.getContactUs().subscribe(
      (response) => {
        this.data = response;
        this.mapData();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapData(){
    this.phone = this.data?.phone;
    this.email = this.data?.email;
    this.facebook = this.data?.facebook;
    this.instagram = this.data?.instagram;
    this.whatsapp = this.data?.whatsapp;
    this.youtube = this.data?.youtube;
    this.twitter = this.data?.twitter;
    this.spinner.hide();
    this.cd.detectChanges();
  }

  submitForm(form){
    this.isSubmitted = true;
    if(form.valid){
      this.spinner.show();
      let data = new FormData();
      
      // data.append("id","1");
      data.append("phone",this.phone);
      data.append("facebook",this.facebook);
      data.append("instagram",this.instagram);
      data.append("whatsapp",this.whatsapp);
      data.append("youtube",this.youtube);
      data.append("twitter",this.twitter);
      data.append("email",this.email);
      data.append("_method","PUT");

      this.api.updateContactUs(data).subscribe(
        (res) => {
          this.isSubmitted = false;
          this.alert.success({ title: "Updated Successfully.." });
          this.spinner.hide();
          this.getData();
        },
        (err) => {
          // 
          this.alert.errorAPI(err.error.errors);
          this.spinner.hide();            
          // 
        }
      );
      // 
  }else{
    this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
  }
}

}
