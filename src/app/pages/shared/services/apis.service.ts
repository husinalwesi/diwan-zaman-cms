import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HeadersService } from "./headers.service";
import { ApiErrorHandlingService } from "./api-error-handling.service";
import { catchError } from "rxjs/operators";
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  constructor(
    private httpClient: HttpClient,
    private header: HeadersService,
    private errorHandlingService: ApiErrorHandlingService,
    private shared: SharedService
  ) { }
  // 
  // START DASHBOARD API 
  // 
  getDashboardData(body): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}getDashboardDetails`).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getSiteContent(body): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}getSiteContent`).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getItemByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getProductByID`, {
      params: { id: id }
    });
  }

  getSharedData(body): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}getSharedData`).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editsite_content(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}editsite_content`, JSON.stringify(body)).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editSharedData(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}editSharedData`, JSON.stringify(body)).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getCategoryByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getCategoryByID`, {
      params: { id: id }
    });
  }

  updateUnit(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}editUnit`, { params: body }).pipe(catchError(this.errorHandlingService.errorHandler));
  }


  getUnitByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getUNByID`, {
      params: { id: id }
    });
  }

  // 
  // END DASHBOARD API 
  //
  // 
  // START MEDIA CRUD
  uploadMedia(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl.split("/admin")[0]}/media`, body, {
      headers: this.header.getHeadersAPI()
    });
  }
  // 
  // END MEDIA CRUD
  // 
  // START ADMIN CRUD
  getAdminList(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    });
  }

  getAdminByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/user/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  DeleteAdmin(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/user/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreAdmin(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/user/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createAdmin(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/user/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editAdmin(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/user/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getCategory(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getCategories`, {
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getUnits(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getUnitList`, {
      params: {}
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getParentCategoryList(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getCategories`).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getSubCategoryList(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/category/sub-category/${id}`, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  // getCategoryByID(id): Observable<any> {
  //   return this.httpClient.get<any>(`${environment.apiUrl}/category/show/${id}`, {
  //     headers: this.header.getHeadersAPI()
  //   });
  // }

  restoreCategory(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/category/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteCategory(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}deleteCategory`, {
      params: { id: id }
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteUnit(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}deleteUnit`, {
      params: { id: id }
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createCategory(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}createCategory`, { params: body }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  updateCategory(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}editCategory`, { params: body }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createUnit(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}createUnit`, { params: body }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editCategory(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/category/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  /////////////////
  getItemsList(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getProductsList`).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  // 
  getPermissionsList(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/role/list/role`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getRolesList(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/role/list/permission`, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteRole(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/role/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteDeliveryFeeShop(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery-fee/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getRoleByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/role/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  deleteItemForSale(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}deleteProduct`, {
      params: { id: id }
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreItemForSale(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/item/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createItemSale(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}createProduct`, JSON.stringify(body)).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editItemSale(body, id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}editProduct&id=${id}`, JSON.stringify(body)).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  reordercategory(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}reordercategory`, JSON.stringify(body)).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  uploadFile(file): Observable<any> {
    const data = new FormData();
    data.append("file", file);
    return this.httpClient.post<any>(`${environment.apiUrl}uploadFile`, data).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  // editItemSale(body): Observable<any> {
  //   return this.httpClient.post<any>(`${environment.apiUrl}/item/update`, body, {
  //     headers: this.header.getHeadersWithFileAPI()
  //   }).pipe(catchError(this.errorHandlingService.errorHandler));
  // }

  addRole(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/role/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editRole(body, id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/role/update/${id}`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteImage(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/item/image-delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getBrandData(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  addBrand(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/brand/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreBrand(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/brand/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editBrand(body, id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/brand/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteBrand(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/brand/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getBrandByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/brand/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  getModelsData(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  addModel(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/model/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreModel(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/model/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editModel(body, id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/model/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteModel(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/model/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getModelByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/model/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  getOrderList(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getOrderListData`);
  }

  isThereNewOrders(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}isThereNewOrders`);
  }

  getReports(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/report?${this.shared.objToQueryString(body)}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  getRefund(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/refund?${this.shared.objToQueryString(body)}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  getShopDeliveryFees(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/delivery-fee?${this.shared.objToQueryString(body)}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  getOrderDetails(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}getOrderDetails`, {
      params: { id: id }
    });
  }

  changeOrderStatus(id, status, userID): Observable<any> {
    // updateOrderStatus

    // $id = $this->getSecureParams("id");
    // 'status'=>$this->getSecureParams("status"),
    // 'admin_responsible'=>$this->getSecureParams("admin_responsible"),
    // 'change_status_at'=>$this->getSecureParams("change_status_at")


    let data: any = {
      status: status,
      id: id,
      admin_responsible: userID,
      change_status_at: new Date().getTime()
    };
    // let data = new FormData();
    // data.append("status", status);
    // 
    // return this.httpClient.get<any>(`${environment.apiUrl}updateOrderStatus`, {
    //   params: data
    // });
    return this.httpClient.get<any>(`${environment.apiUrl}updateOrderStatus`, {
      params: data
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  // 
  // 
  getDealershipList(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getDelivery(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteDealership(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/dealership/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deliveryDelete(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreDealership(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/dealership/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getDealershipByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/dealership/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  createDealership(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/dealership/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editDealership(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/dealership/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreDelivery(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createDelivery(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createShopDelivery(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery-fee/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getDeliveryByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/delivery/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  editDelivery(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editDeliveryShop(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery-fee/update/${body.id}`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getCommission(body, path): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getSubscriptions(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  subscriptionDelete(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/subscription/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreSubscription(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/subscription/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createSubscription(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/subscription/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getSubscriptionByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/subscription/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  editSubscription(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/subscription/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getSettlements(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/settlement`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  updateSettlement(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/settlement/update`, body, {
      headers: this.header.getHeadersWithAuthAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  // 
  // 
  // 
  // 

  getBannerData(body, path): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getBannerByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/banner/show/${id}`, {
      headers: this.header.getHeadersAPI(),
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createBanner(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/banner/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  updateBanner(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/banner/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    });
  }

  deleteBanner(id): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/banner/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI(),
    });
  }

  unDeleteBanner(id): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/banner/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI(),
    });
  }

  commissionDelete(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/commission/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  unDeleteCommission(id): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/commission/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI(),
    });
  }

  editCommission(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/commission/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createCommission(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/commission/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getCommissionByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/commission/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  getCategorylist(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/category/list?limit=10000`, {
      headers: this.header.getHeadersAPI(),
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getShopData(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  addShop(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/shop/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editShop(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/shop/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getShopByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/shop/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  deleteShop(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/shop/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreShop(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/shop/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  refundAccept(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/refund/accept/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  refundDecline(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/refund/decline/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  updateAppContent(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/app_content`, body, {
      headers: this.header.getHeadersWithFileAPI()
    });
  }

  updateContactUs(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/contact-us`, body, {
      headers: this.header.getHeadersWithFileAPI()
    });
  }

  getAppContent(query): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/app_content/show?id=${query}`, {
      headers: this.header.getHeadersAPI(),
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getContactUs(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl.split("/admin")[0]}/contact-us`, {
      headers: this.header.getHeadersAPI(),
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  // 
  getServiceCenter(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteServiceCenter(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/center/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreServiceCenter(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/center/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getServiceCenterByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/center/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  addServiceCenter(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/center/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editServiceCenter(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/center/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  // 
  // 
  getService(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteService(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/service/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreService(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/service/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getServiceByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/service/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  addService(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/service/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editService(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/service/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  // 
  // 
  getReview(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteReview(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/review/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreReview(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/review/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createTimeSlot(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/time-slot/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  deleteTimeSlot(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/time-slot/delete/${id}`, {}, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  // 
  // 
  getDiscount(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getDiscountByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/discount/show/${id}`, {
      headers: this.header.getHeadersAPI()
    });
  }

  deleteDiscount(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/discount/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  restoreDiscount(id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/discount/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createDiscount(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/discount/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  editDiscount(body, id): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/discount/update/${id}`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  // 
  getMajorData(body, path): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  itemChangeStatus(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/item/change_status/${id}`, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  reviewDetails(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/review/show/${id}`, {
      headers: this.header.getHeadersAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getSubjctsData(body, path): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/${path}`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getSubjectByID(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/subject/show/${id}`, {
      headers: this.header.getHeadersAPI(),
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  createSubject(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/subject/store`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  updateSubject(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/subject/update`, body, {
      headers: this.header.getHeadersWithFileAPI()
    });
  }

  deleteSubject(id): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/subject/delete/${id}`, {}, {
      headers: this.header.getHeadersAPI(),
    });
  }

  unDeleteSubject(id): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/subject/restore/${id}`, {}, {
      headers: this.header.getHeadersAPI(),
    });
  }

  getDeliveryFeeNew(body): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/delivery-fee/list?${this.shared.objToQueryString(body)}`, {
      headers: this.header.getHeadersAPI()
    });
  }
  getDeliveryFeeNewById(id): Observable<any> {//maybe post
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery-fee/details`, { id: id }, {
      headers: this.header.getHeadersWithAuthAPI()
    });
  }
  addEditDeliveryFeeNew(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/delivery-fee/add`, body, {
      headers: this.header.getHeadersWithAuthAPI()
    });
  }
  // 
  // 
  // 
  getAnnouncementsData(body): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/announcements`, {
      headers: this.header.getHeadersAPI(),
      params: body
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }
  createAnnouncements(body): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/announcements`, body, {
      headers: this.header.getHeadersWithFileAPI()
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

  getItemDetails(id): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/item/product-details`, {
      headers: this.header.getHeadersAPI(),
      params: { reference_id: id }//eg FT11001
    }).pipe(catchError(this.errorHandlingService.errorHandler));
  }

}