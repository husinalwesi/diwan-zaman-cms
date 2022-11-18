import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DynamicAsideMenuConfig } from '../../configs/dynamic-aside-menu.config';
import { LocalStorage as ls } from '../../../utils/localstorage.service';
import { SharedService } from 'src/app/pages/shared/services/shared.service';

const emptyMenuConfig = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class DynamicAsideMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  menuConfig$: Observable<any>;
  DynamicAsideMenuConfigTemp: any;
  currentUser: any;
  constructor(private shared: SharedService) {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.loadMenu();
  }

  // Here you able to load your menu from server/data-base/localStorage
  // Default => from DynamicAsideMenuConfig
  private loadMenu() {
    this.setMenu(DynamicAsideMenuConfig);
    // this.setPermission();
    // this.setMenu(this.DynamicAsideMenuConfigTemp);
  }

  // setPermission(){
  //   let tempArr = DynamicAsideMenuConfig;
  //   let items = [];
  //   for (let index = 0; index < tempArr.items.length; index++) {
  //     let temp = tempArr.items[index].id;
  //     let submenu = tempArr.items[index].submenu;
  //     // 
  //     if(submenu){
  //       // 
  //         let originalSubMenuPermitted = tempArr.items[index];
  //         let tempSubMenuPermitted = [];
  //         // 
  //         for (let index2 = 0; index2 < submenu.length; index2++) {
  //           let submenuID = submenu[index2].id;
  //           if(this.shared.isRoutePermitted(submenuID)){
  //             tempSubMenuPermitted.push(submenu[index2]);
  //           }
  //         }
  //         //
  //         if(tempSubMenuPermitted.length){
  //           originalSubMenuPermitted.submenu = tempSubMenuPermitted;
  //           items.push(originalSubMenuPermitted);
  //         }
  //       // 
  //     }else{
  //       if(this.shared.isRoutePermitted(temp)){
  //         // console.log(temp);
  //         items.push(tempArr.items[index]);
  //       }
  //     }
  //   }
  //   tempArr.items = items;
  //   this.setMenu(tempArr);
  // }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }
}
