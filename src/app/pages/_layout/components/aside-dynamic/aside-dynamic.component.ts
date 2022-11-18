import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LayoutService, DynamicAsideMenuService } from '../../../../_metronic/core';
import { LocalStorage as ls } from "../../../../utils/localstorage.service";

@Component({
  selector: 'app-aside-dynamic',
  templateUrl: './aside-dynamic.component.html',
  styleUrls: ['./aside-dynamic.component.scss']
})
export class AsideDynamicComponent implements OnInit, OnDestroy {
  menuConfig: any = { items: [] };
  subscriptions: Subscription[] = [];

  disableAsideSelfDisplay: boolean;
  headerLogo: string;
  brandSkin: string;
  ulCSSClasses: string;
  asideMenuHTMLAttributes: any = {};
  asideMenuCSSClasses: string;
  asideMenuDropdown;
  brandClasses: string;
  asideMenuScroll = 1;
  asideSelfMinimizeToggle = false;

  currentUrl: string;
  // role: string;

  constructor(
    private layout: LayoutService,
    private router: Router,
    private menu: DynamicAsideMenuService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initialize();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // 
        this.resetSelection();
        this.cdr.detectChanges();
        // 
      }
    });
  }

  resetSelection() {
    this.resetEach();
    this.setCurrentIsActive();
  }

  initialize() {
    // this.role = ls.getValue("currentUser").role.name;
    // load view settings
    this.disableAsideSelfDisplay =
      this.layout.getProp('aside.self.display') === false;
    this.brandSkin = this.layout.getProp('brand.self.theme');
    this.headerLogo = this.getLogo();
    this.ulCSSClasses = this.layout.getProp('aside_menu_nav');
    this.asideMenuCSSClasses = this.layout.getStringCSSClasses('aside_menu');
    this.asideMenuHTMLAttributes = this.layout.getHTMLAttributes('aside_menu');
    this.asideMenuDropdown = this.layout.getProp('aside.menu.dropdown') ? '1' : '0';
    this.brandClasses = this.layout.getProp('brand');
    this.asideSelfMinimizeToggle = this.layout.getProp(
      'aside.self.minimize.toggle'
    );
    this.asideMenuScroll = this.layout.getProp('aside.menu.scroll') ? 1 : 0;
    this.asideMenuCSSClasses = `${this.asideMenuCSSClasses} ${this.asideMenuScroll === 1 ? 'scroll my-4 ps ps--active-y' : ''}`;

    // router subscription
    this.currentUrl = this.router.url.split(/[?#]/)[0];
    const routerSubscr = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
      this.cdr.detectChanges();
    });
    this.subscriptions.push(routerSubscr);

    // menu load
    let menuSubscr = this.menu.menuConfig$.subscribe(res => {
      this.grantAccess(res);
    });
    this.subscriptions.push(menuSubscr);
  }

  grantAccess(res) {
    let temp = [];
    // 
    for (let index = 0; index < res.items.length; index++) {
      // if(
      //   (this.role == "Super Admin") ||
      //   (this.role == "Technical team" && (res.items[index]?.title == "Requests" || res.items[index]?.title == "Customers")) ||
      //   (this.role == "Marketing team" && (res.items[index]?.title == "Blogs" || res.items[index]?.title == "Dashboard"))
      // ){
      //   if(this.role == "Marketing team" && res.items[index]?.title == "Blogs"){
      //     res.items[index].submenu = [res.items[index].submenu[0]];//remove category..
      //   }

      //   temp.push(res.items[index]);
      // }
      temp.push(res.items[index]);
    }
    // 
    this.menuConfig.items = temp;
    this.setCurrentIsActive();
  }

  setCurrentIsActive() {
    // call when route change..
    let c_pathname = window.location.pathname;
    // console.log(c_pathname);

    for (let index = 0; index < this.menuConfig.items.length; index++) {
      // 
      if (c_pathname.includes(this.menuConfig.items[index]?.page)) this.menuConfig.items[index]!.isActive = true;
      // 
    }
    this.cdr.detectChanges();
  }

  currentPathnameChangeToOrigin(path) {
    let innerPaths = [
      // {"/dashboard": []},
      // {"/category": ["/category-edit","/category-create"]},
      // {"/admins": ["/admin-create","/admin-view","/admin-edit"]},
    ];

    for (let index = 0; index < innerPaths.length; index++) {
      // 
      let key = Object.keys(innerPaths[index])[0];
      for (let index2 = 0; index2 < innerPaths[index][key].length; index2++) {
        if (path.includes(innerPaths[index][key][index2])) {
          return key.replace(/\s/g, '');
        }
      }
      // 
    }
    //
    return path.replace(/\s/g, '');
  }

  private getLogo() {
    return `./assets/media/logos/logo2.png`;
  }

  ngOnChanges(changes): void {
    this.initialize();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  resetEach() {
    for (let index = 0; index < this.menuConfig.items.length; index++) {
      this.menuConfig.items[index]!.isActive = false;
      // 
      if (this.menuConfig.items[index]?.submenu) {
        for (let index2 = 0; index2 < this.menuConfig.items[index]?.submenu.length; index2++) {
          this.menuConfig.items[index]!.submenu[index2]!.isActive = false;
        }
      }
      //
    }
    this.cdr.detectChanges();
  }

  toggleIsActive(item) {
    let c_status = !item.isActive;
    // this.resetEach();
    item.isActive = c_status;
    this.setCurrentIsActive();
  }

  setParentActive(item) {
    return item;
  }

  hasPermission(item) {
    if (ls.getValue("currentUser").role == "admin") return true;
    if (item.id == "dashboard") return true;
  }

}
