import { Injectable } from '@angular/core';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalStorage as ls } from '../../../utils/localstorage.service';
// import { AlertService } from 'src/app/_metronic/core/services/alert.service';
// import { ApisService } from '../../shared/services/apis.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public imageFullView$ = new BehaviorSubject<string>('');
  public imageFullViewAlbum$ = new BehaviorSubject<any>([]);
  public paymentURL$ = new BehaviorSubject<any>({});
  routes: any = [
    { key: "dashboard", value: "dashboard" },
    { key: "categories-list", value: "category" },
    { key: "categories-delete-list", value: "category-deleted" },
    { key: "admins-list", value: "admins" },
    { key: "admins-delete-list", value: "admins-deleted" },
    { key: "users-list", value: "users" },
    { key: "users-delete-list", value: "users-deleted" },
    { key: "roles-permissions", value: "roles-and-permissions" },
    { key: "announcements-list", value: "announcements" },
    { key: "items-approved-list", value: "items-for-sale-approved" },
    { key: "items-pending-list", value: "items-for-sale-pending" },
    { key: "items-deleted-list", value: "items-for-sale-deleted" },
    { key: "discount-list", value: "discount" },
    { key: "discount-delete-list", value: "discount-deleted" },
    { key: "services-list", value: "services" },
    { key: "services-delete-list", value: "services-deleted" },
    { key: "local-service-center-list", value: "local-center-service" },
    { key: "local-service-center-delete-list", value: "local-center-service-deleted" },
    { key: "commissions-list", value: "commission" },
    { key: "commissions-delete-list", value: "commission-deleted" },
    { key: "settlements-list", value: "settlements" },
    { key: "reviews-list", value: "reviews" },
    { key: "reviews-delete-list", value: "reviews-deleted" },
    { key: "delivery-fees-list", value: "delivery-fees" },
    { key: "delivery-fees-delete-list", value: "delivery-fees-deleted" },
    { key: "orders-list", value: "orders" },
    // { key: "orders-delete-list", value: "xxxxxxx" },
    { key: "brand-list", value: "brand" },
    { key: "brand-delete-list", value: "brand-deleted" },
    { key: "car-models-list", value: "car-models" },
    { key: "car-models-delete-list", value: "car-models-deleted" },
    { key: "dealership-centre-list", value: "dealership-centre" },
    { key: "dealership-centre-delete-list", value: "dealership-centre-deleted" },
    { key: "subscription-list", value: "subscription" },
    { key: "subscription-delete-list", value: "subscription-deleted" },
    { key: "banner-list", value: "banner" },
    { key: "banner-delete-list", value: "banner-deleted" },
    { key: "shops-list", value: "shops" },
    { key: "shops-delete-list", value: "shops-deleted" },
    { key: "reports-list", value: "reports" },
    { key: "refunds-list", value: "refunds" },
    { key: "delivery-fees-shop-list", value: "delivery-fees-shop" },
    { key: "delivery-fee-types-list", value: "delivery-fee-types" },
    { key: "subjects-list", value: "subjects" },
    { key: "subjects-delete-list", value: "subjects-deleted" },
    // { key: "website-content-show", value: ["about-us","terms-conditions","privacy-policy","contact-us"] }
    { key: "website-content-show", value: "website-content-show" }
  ];
  constructor(
    private location: Location,
    private router: Router,
    // private alert: AlertService,
    // private api: ApisService

  ) {

  }

  objToQueryString(obj) {
    let temp = ``;
    let counter = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        temp += counter == 0 ? `` : `&`;
        temp += `${key}=${obj[key]}`;
      }
      counter++;
    }
    return temp;
  }

  showImageFullView(img) {
    this.imageFullView$.next(img);
  }

  showImageFullViewAlbum(arr) {
    this.imageFullViewAlbum$.next(arr);
  }

  backToPreviousPage() {
    this.location.back();
  }


  redirectTo(path) {
    this.router.navigate([path]);
  }

  stringToBoolean(str) {
    return str === 'true' || str === true;
  }

  setEleFocusById(ele_id) {
    setTimeout(() => {//cause ele hidden, so after view it will focus..
      document.getElementById(ele_id).focus();
    });
  }

  extractName(f_name, l_name) {
    if (f_name && l_name) return f_name + " " + l_name;
    else if (f_name) return f_name;
    else if (l_name) return l_name;
    else return "---";
  }

  extractTwoLangName(en, ar) {
    if (en && ar) return en + " - " + ar;
    else if (en) return en;
    else if (ar) return ar;
    else return "---";
  }

  scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  removeFromArrayByIndex(arr, index) {
    if (arr.length > 1) {
      arr.splice(index, 1);
      return arr;
    } else {
      return [];
    }
  }

  getCurrentUserRoles() {
    let currentUser = ls.getValue('currentUser');
    let role = currentUser?.permission || [];
    return role;
  }

  getRealRoute(name) {
    for (let index = 0; index < this.routes.length; index++) {
      if (this.routes[index].key == name) return `/${this.routes[index].value}`;
    }
    return "/dashboard";
  }

  isRoutePermitted(routeName) {
    let currentUserRoles = this.getCurrentUserRoles();
    for (let index = 0; index < currentUserRoles.length; index++) {
      if (
        currentUserRoles[index].name == routeName ||
        routeName == "users-list" ||
        routeName == "users-delete-list"
      ) return true;
    }
    return false;
  }

  // notification() {
  //   this.api.isThereNewOrders().subscribe(
  //     (res) => {
  //       if (res.status === "200") {
  //         // 
  //         // this.alert.success({ title: res.msg });
  //       }
  //       // this.orderResponse = res.dataObject;
  //     },
  //     (err) => {
  //     }
  //   );
  // }

  // showMessage() {
  //   this.alert.success({ title: "Subject deleted successfully." });
  // }

}
