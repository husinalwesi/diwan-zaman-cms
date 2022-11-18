import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';
import { TranslationService } from 'src/app/_metronic/core/services/translation.service';

@Component({
  selector: 'app-subheader1',
  templateUrl: './subheader1.component.html',
})
export class Subheader1Component implements OnInit {
  breadcrump: any = [];

  constructor(private router: Router, private translate: TranslationService){}
  
 ngOnInit() {
    this.updateBreadcrump();//initialize the breadcrump..
    // 
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.updateBreadcrump();//initialize the breadcrump when url is changed..
    });
  }

  updateBreadcrump(){
    this.breadcrump = [{"title": "MENU.DASHBOARD", link: "/dashboard"}];
    let url = document.location.pathname || "";
    if(!url) return false;
    // 
    if(this.isUrlContains(url,"dashboard")){
      return false;// in case the home page is fired..
    }else if(this.isUrlContains(url,"admins")){
      this.breadcrump.push({title: "SHARED.ADMIN_LIST", link: "/admins"});
    }else if(this.isUrlContains(url,"admin")){
      this.breadcrump.push({title: "SHARED.ADMIN_LIST", link: "/admins"});
    if(this.isUrlContains(url,"-edit")){
      this.breadcrump.push({title: "SHARED.UPDATE_ADMIN", link: "#"});
    }else if(this.isUrlContains(url,"-create")){
      this.breadcrump.push({title: "SHARED.CREATE_ADMIN", link: "#"});
    }else if(this.isUrlContains(url,"-view")){
      this.breadcrump.push({title: "SHARED.VIEW_ADMIN", link: "#"});
    }
    }else if(this.isUrlContains(url,"users")){
      this.breadcrump.push({title: "users_list", link: "/users"});
    // if(this.isUrlContains(url,"-edit")){
    //   this.breadcrump.push({title: "SHARED.UPDATE_ADMIN", link: "#"});
    // }else if(this.isUrlContains(url,"-create")){
    //   this.breadcrump.push({title: "SHARED.CREATE_ADMIN", link: "#"});
    // }else if(this.isUrlContains(url,"-view")){
    //   this.breadcrump.push({title: "SHARED.VIEW_ADMIN", link: "#"});
    // }
    }else if(this.isUrlContains(url,"category")){
      this.breadcrump.push({title: "SHARED.CATEGORY_LIST", link: "/category"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "SHARED.UPDATE_CATEGORY", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "SHARED.CREATE_CATEGORY", link: "#"});
      }
    }else if(this.isUrlContains(url,"roles-and-permissions")){
      this.breadcrump.push({title: "Roles & Permissions", link: "/roles-and-permissions"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Roles & Permissions", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Roles & Permissions", link: "#"});
      }
    }else if(this.isUrlContains(url,"delivery-fees-shop")){
      this.breadcrump.push({title: "Delivery Fees Shop", link: "/delivery-fees-shop"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Delivery Fees Shop", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Delivery Fees Shop", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Delivery Fees Shop", link: "#"});
      }
    }else if(this.isUrlContains(url,"delivery-fee-types")){
      this.breadcrump.push({title: "Delivery Fee", link: "/delivery-fee-types"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Delivery Fee", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Delivery Fee", link: "#"});
      }
    }else if(this.isUrlContains(url,"reviews")){
      this.breadcrump.push({title: "Reviews", link: "/reviews"});
      if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Reviews", link: "#"});
      }
    }else if(this.isUrlContains(url,"review-images")){
      this.breadcrump.push({title: "Reviews", link: "/reviews"});
      if(this.isUrlContains(url,"review-images")){
        this.breadcrump.push({title: "Review Images", link: "#"});
      }
    }else if(this.isUrlContains(url,"items-for-sale")){
      this.breadcrump.push({title: "Items For Sale", link: "/items-for-sale"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Items For Sale", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Items For Sale", link: "#"});
      }
    }else if(this.isUrlContains(url,"announcements")){
      this.breadcrump.push({title: "Announcements", link: "/announcements"});
      if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Announcements", link: "#"});
      }
    }else if(this.isUrlContains(url,"services")){
      this.breadcrump.push({title: "Services", link: "/services"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Service", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Service", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Service", link: "#"});
      }
    }else if(this.isUrlContains(url,"discount")){
      this.breadcrump.push({title: "Discount", link: "/discount"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Discount", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Discount", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Discount", link: "#"});
      }
    }    
    else if(this.isUrlContains(url,"local-center-service")){
      this.breadcrump.push({title: "Service Centre Information", link: "/local-center-service"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Service Centre Information", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Service Centre Information", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Service Centre Information", link: "#"});
      }
    }else if(this.isUrlContains(url,"commissions")){
      this.breadcrump.push({title: "Commissions", link: "/commissions"});
    }else if(this.isUrlContains(url,"rating")){
      this.breadcrump.push({title: "Rating", link: "/rating"});
    }else if(this.isUrlContains(url,"delivery-fees")){
      this.breadcrump.push({title: "Delivery Fees", link: "/delivery-fees"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Delivery", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Delivery", link: "#"});
      }
    }else if(this.isUrlContains(url,"orders")){
      this.breadcrump.push({title: "Orders", link: "/orders"});
    }else if(this.isUrlContains(url,"refund-requests")){
      this.breadcrump.push({title: "Refund Requests", link: "/refund-requests"});
    }else if(this.isUrlContains(url,"brand")){
      this.breadcrump.push({title: "Car Brands", link: "/brand"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Car Brand", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Car Brand", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Car Brands", link: "#"});
      }
    }else if(this.isUrlContains(url,"car-models")){
      this.breadcrump.push({title: "Car Models", link: "/car-models"});
      if(this.isUrlContains(url,"car-model-edit")){
        this.breadcrump.push({title: "Update Car Model", link: "#"});
      }else if(this.isUrlContains(url,"car-model-create")){
        this.breadcrump.push({title: "Create Car Model", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Car Models", link: "#"});
      }
    }else if(this.isUrlContains(url,"dealership-centre")){
      this.breadcrump.push({title: "Dealership Centre", link: "/dealership-centre"});
      if(this.isUrlContains(url,"dealership-centre-edit")){
        this.breadcrump.push({title: "Update Dealership Centre", link: "#"});
      }else if(this.isUrlContains(url,"dealership-centre-create")){
        this.breadcrump.push({title: "Create Dealership Centre", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Dealership Centre", link: "#"});
      }
    }else if(this.isUrlContains(url,"subscription-payment")){
      this.breadcrump.push({title: "Subscription Payment", link: "/subscription-payment"});
    }else if(this.isUrlContains(url,"advertisement-requests")){
      this.breadcrump.push({title: "Advertisement Requests", link: "/advertisement-requests"});
    }else if(this.isUrlContains(url,"subscription")){
      this.breadcrump.push({title: "Subscriptions", link: "/subscription"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Subscription", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Subscription", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Subscription", link: "#"});
      }
    }else if(this.isUrlContains(url,"settlements")){
      this.breadcrump.push({title: "Settlements", link: "/settlements"});
    }else if(this.isUrlContains(url,"banner")){
      this.breadcrump.push({title: "Banners", link: "/banner"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Banner", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Banner", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Banners", link: "#"});
      }
    }else if(this.isUrlContains(url,"shops")){
      this.breadcrump.push({title: "shops", link: "/shops"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update shop", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create shop", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted shops", link: "#"});
      }
    }else if(this.isUrlContains(url,"subjects")){
      this.breadcrump.push({title: "Subjects", link: "/subjects"});
      if(this.isUrlContains(url,"-edit")){
        this.breadcrump.push({title: "Update Subject", link: "#"});
      }else if(this.isUrlContains(url,"-create")){
        this.breadcrump.push({title: "Create Subject", link: "#"});
      }else if(this.isUrlContains(url,"-deleted")){
        this.breadcrump.push({title: "Deleted Subjects", link: "#"});
      }
    }else if(this.isUrlContains(url,"reports")){
      this.breadcrump.push({title: "Reports", link: "/reports"});
    }else if(this.isUrlContains(url,"refunds")){
      this.breadcrump.push({title: "Refunds", link: "/refunds"});
    }else if(this.isUrlContains(url,"about-us")){
      this.breadcrump.push({title: "About Us", link: "/about-us"});
    }else if(this.isUrlContains(url,"terms-conditions")){
      this.breadcrump.push({title: "Terms Conditions", link: "/terms-conditions"});
    }else if(this.isUrlContains(url,"privacy-policy")){
      this.breadcrump.push({title: "Privacy Policy", link: "/privacy-policy"});
    }else if(this.isUrlContains(url,"contact-us")){
      this.breadcrump.push({title: "Contact Us", link: "/contact-us"});
    }else if(this.isUrlContains(url,"time-slot-create")){
      this.breadcrump.push({title: "Create Time Slot", link: "/time-slot-create"});
    }
    // 
  }

  isUrlContains(str,subStr){
    if(str.indexOf(subStr) !== -1) return true;
    return false;
  }

}
