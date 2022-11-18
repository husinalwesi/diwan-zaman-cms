import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorage as ls } from "../../../utils/localstorage.service";
import { SharedService } from 'src/app/pages/shared/services/shared.service';
import { ApisService } from 'src/app/pages/shared/services/apis.service';
// import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { NgxSpinnerService } from "ngx-spinner";
import { DynamicAsideMenuService } from 'src/app/_metronic/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  defaultAuth = {
    Username: '',
    password: '',
    user_type: 'admin'
  };
  loginForm: FormGroup;
  errorMsg: string;
  alertEle: Element;
  alertEleSuccess: Element;
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private shared: SharedService,
    private router: Router,
    private api: ApisService,
    private route: ActivatedRoute,
    // private alert: AlertService,
    private spinner: NgxSpinnerService,
    // private side: DynamicAsideMenuService
  ) {
    // this.spinner.show();
  }

  ngOnInit(): void {
    this.alertEle = document.getElementById("error-panel");
    this.alertEleSuccess = document.getElementById("success-panel");
    this.toggleSuccessMsg("hide");
    this.toggleErrorMsg("hide");
    this.checkTempLoginData();
    this.initForm();
    // this.side.menuConfig$ = {
    //   items: []
    // };
  }

  checkTempLoginData() {

    setTimeout(() => {
      let queryParams = this.route.queryParams["_value"]?.payment;
      if (queryParams) {
        if (queryParams === "true") {

          this.setSuccessMsg("Your payment has been processed successfully.");
          this.toggleSuccessMsg("show");


          let tempLoginPayment = ls.getValue("tempLoginPayment");
          if (tempLoginPayment?.Username && tempLoginPayment?.password && tempLoginPayment?.type) {
            const data = new FormData();
            data.append("Username", tempLoginPayment?.Username);
            data.append("password", tempLoginPayment?.password);
            data.append("type", tempLoginPayment?.type);
            ls.removeValue("tempLoginPayment");
            this.signShop(data);
          }


          // this.alert.success({title: 'Your payment has been processed successfully.'});
        } else {
          this.setErrorMsg("Unfortunately payment was rejected.");
          this.toggleErrorMsg("show");
          // this.alert.error({title: 'Unfortunately payment was rejected.'});
        }
      }
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      Username: [
        this.defaultAuth.Username,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-Username-address
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
      user_type: [
        this.defaultAuth.user_type,
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }

  submit() {
    this.toggleErrorMsg("hide");
    this.toggleSuccessMsg("hide");
    // 
    let data = {
      username: this.f.Username.value,
      password: this.f.password.value,
    }
    // const data = new FormData();
    // data.append("Username",);
    // data.append("password",this.f.password.value);
    if (this.f.user_type.value == "admin") {
      this.authService.loginCustom(data).subscribe(
        (res) => {
          if (+res.status == 200) {
            ls.setValue("currentUser", { userID: res.dataObject.id, userName: this.f.Username.value, role: res.dataObject.role });
            this.shared.redirectTo("/dashboard");
          } else {
            this.setErrorMsg("Incorrect Username or password.");
            this.toggleErrorMsg("show");
          }
          // this.setErrorMsg("Incorrect Username or password.");
          // this.toggleErrorMsg("show");
          // let currentUserModel = res["data"];
          // currentUserModel["Authorization"] = "Bearer " + res["token"];
          // // 
          // this.api.getRoleByID(currentUserModel["roles"][0]["id"]).subscribe(
          //   (res2) => {
          //     currentUserModel["permission"] = res2.permission;
          //     ls.setValue("currentUser", currentUserModel);
          //     // 
          //     this.router.navigate([this.shared.getRealRoute(res2.permission[0].name)]);
          //   },
          //   (err) => {
          //     this.setErrorMsg("You don't have a permission to access the CMS.");
          //     this.toggleErrorMsg("show");
          //   }
          // );
        },
        (err) => {
          this.setErrorMsg("Incorrect Username or password.");
          this.toggleErrorMsg("show");
        }
      );
    } else {//shop
      // data.append("type", this.f.user_type.value);
      this.signShop(data);
    }
  }

  signShop(data) {
    this.spinner.show();
    this.authService.loginCustomShop(data).subscribe(
      (res) => {
        console.log(res);
        if (res.is_paid) {
          console.log(res);

          let currentUserModel = res["data"];
          currentUserModel["Authorization"] = "Bearer " + res["token"];//check only this.

          this.api.getRoleByID(currentUserModel["roles"][0]["id"]).subscribe(
            (res2) => {
              currentUserModel["permission"] = res2.permission;
              ls.setValue("currentUser", currentUserModel);
              // 
              this.router.navigate([this.shared.getRealRoute(res2.permission[0].name)]);
            },
            (err) => {
              this.setErrorMsg("You don't have a permission to access the CMS.");
              this.toggleErrorMsg("show");
            }
          );

        } else {
          // 
          ls.setValue("tempLoginPayment", {
            Username: data.get("Username"),
            password: data.get("password"),
            type: data.get("type")
          });

          setTimeout(() => {
            window.location.replace(`https://parvice-web.designinjo.com/api/admin/shop/payment?shop_id=${res.data.id}&type=${data.get("type")}`);
          });
          // this.shared.paymentURL$.next({
          //   payment_url: res.payment_url,
          //   shop_id: res.data.id
          // });
          // setTimeout(() => {
          //   this.shared.redirectTo("auth/payment");
          // });            
        }
        // res.is_paid
        // let currentUserModel = res["data"];
        // currentUserModel["Authorization"] = "Bearer " + res["token"];
        // 
        // this.api.getRoleByID(currentUserModel["roles"][0]["id"]).subscribe(
        //   (res2) => {
        //     currentUserModel["permission"] = res2.permission;
        //     ls.setValue("currentUser", currentUserModel);
        //     // 
        //     this.router.navigate([this.shared.getRealRoute(res2.permission[0].name)]);
        //   },
        //   (err) => {
        //     this.setErrorMsg("You don't have a permission to access the CMS.");
        //     this.toggleErrorMsg("show");
        //   }
        // );     
        // Username:suha.hijawi+1@atomkiteam.com
        // password:IlAp8nXP
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.setErrorMsg("Incorrect Username or password.");
        this.toggleErrorMsg("show");
      }
    );
  }
  // openPaymentWindow(){
  //   var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
  //   var URL = "https://www.google.com/";
  //   var win = window.open(URL, "_blank", strWindowFeatures);
  // }

  setErrorMsg(str) {
    this.alertEle.innerHTML = str;
  }

  toggleErrorMsg(status) {
    if (status === "show") this.alertEle.classList.remove("hide");
    else this.alertEle.classList.add("hide");
  }

  setSuccessMsg(str) {
    this.alertEleSuccess.innerHTML = str;
  }

  toggleSuccessMsg(status) {
    if (status === "show") this.alertEleSuccess.classList.remove("hide");
    else this.alertEleSuccess.classList.add("hide");
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
    // this.spinner.show();
  }
}
