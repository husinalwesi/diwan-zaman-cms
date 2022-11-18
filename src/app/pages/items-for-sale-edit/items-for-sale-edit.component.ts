import { environment } from './../../../environments/environment';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_metronic/core/services/alert.service';
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-items-for-sale-edit',
  templateUrl: './items-for-sale-edit.component.html',
  styleUrls: ['./items-for-sale-edit.component.scss']
})
export class ItemsForSaleEditComponent implements OnInit {
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  responseTable: any = [];
  selectedTable: any = [];
  // 
  isSubmitted: boolean = false;
  id: string = "";
  sellerName: string = "";
  sellerNameAr: string = "";
  partName: string = "";
  partName_ar: string = "";
  price: string = "";
  reference_id: string = "";
  shortDescription: string = "";
  shortDescriptionAr: string = "";
  longDescription: string = "";
  longDescriptionAr: string = "";
  subCategory: string = "0";
  mainCategory: string = "0";
  units: any = [
    {
      id: 0,
      price: 0
    }
  ];

  // this.units = [{ id: 2, price: 50 }];
  // this.change.detectChanges();


  // 
  subCategoryFrequently: string = "0";
  mainCategoryFrequently: string = "0";
  quantity: string = "0";
  discountPrice: string = "";
  brand: any = [];
  fbw: any = [];
  size: string = "0";
  wights: string = "0";
  shop: string = "0";
  //   
  unitsList: any = [];
  mainCategoryList: any = [];
  subCategoryList: any = [
    { id: 0, value: "-- Select one --" }
  ];
  shopList: any = [];
  // 
  serviceListFreq: any = [];
  servicesListSelected: any = [];
  // 
  mainCategoryListFrequently: any = [];
  subCategoryListFrequently: any = [];
  brandList: any = [];
  // 
  isCreatePage: boolean = false;
  isEditPage: boolean = false;
  isViewPage: boolean = false;
  response: any = [];
  image: string = ""
  image_url: any = environment.defaultImgEle;
  images: any = [];
  imagesFromApi: any = [];
  imageList: any = [];
  isSponsored: boolean = false;
  isDeals: boolean = false;
  item_type: string = "0";
  item_typeList: any = [
    { id: "after_market", value: "After market" },
    { id: "OEM", value: "OEM" }
  ];
  searchKey: string = "";
  keyList: any = [];
  itemsListFreq: any = [];
  dropdownSettings: any = {};
  imagesFromExternalAPI: any = [];
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService,
    private cdk: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'value',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: false,
      enableCheckAll: false,
    };
    //   if(this.TranslationService.isRTL()){      
    //     this.subCategoryList = [
    //       { id: 0, value: "-- اختر خيارا --" }
    //     ];

    //     this.item_typeList = [
    //       {id: "after_market", value: "بعد السوق"},
    //       {id: "OEM", value: "مصنع للأدوات الأصلية"}
    //     ];
    //     this.dropdownSettings = {
    //       singleSelection: false,
    //       idField: 'id',
    //       textField: 'value',
    //       selectAllText: 'اختر الجميع',
    //       unSelectAllText: 'الغاء تحديد الجميع',
    //       itemsShowLimit: 4,
    //       allowSearchFilter: false,
    //       enableCheckAll: false,
    //     };
    // }


    this.isCreatePage = window.location.href.indexOf("items-for-sale-create") !== -1;
    this.isEditPage = window.location.href.indexOf("items-for-sale-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("items-for-sale-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    this.getMainCategoryData();
    this.getUnits();
    if (!this.isCreatePage) this.getData();




    // setTimeout(() => {
    //   this.units = [
    //     {
    //       id: "2",
    //       price: "50"
    //     }
    //   ];
    //   this.cdk.detectChanges();
    //   alert("sdf");

    // }, 1000);

    // this.getTableData();
    // this.getBrands();
    // this.getShopList();
    // this.getServiceList();
    // // this.getMainCategoryDataFrequently();

    // this.getItemsList();
    // this.getCarCompatibility();
  }

  getCarCompatibility() {
    if (!this.reference_id) return false;
    this.spinner.show();
    this.imagesFromExternalAPI = [];
    this.api.getItemDetails(this.reference_id).subscribe(
      (res) => {
        let image_response = res.articles[0].images;
        this.imagesFromExternalAPI = image_response.map((res: any) => {
          const result = {
            img: res.imageURL800 || res.imageURL400 || res.imageURL200 || res.imageURL100 || res.imageURL850 || environment.defaultImgEle
          };
          return result;
        });

        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getServiceList() {
    // this.api.getItemsList({ page: 1, limit: 1000 },"service").subscribe(
    //   (res) => {
    //     if(res.total){
    //       this.serviceListFreq = res.data.map((res: any) => {
    //         let provider_name = res?.type_id?.name || "";
    //         let service_dealership_name = res.name || "";
    //         // 
    //         let final_value = ``;
    //         if(provider_name && service_dealership_name) final_value = `${service_dealership_name} - ${provider_name}`;
    //         else if(provider_name && !service_dealership_name) final_value = provider_name;
    //         else if(!provider_name && service_dealership_name) final_value = service_dealership_name;
    //         else final_value = `---`;
    //         // 
    //           const result = {
    //             id: res.id,
    //             value: final_value
    //           };
    //           return result;
    //         });
    //         this.spinner.hide();
    //     }else{
    //       this.serviceListFreq = [];
    //       this.spinner.hide();
    //     }
    //     this.change.detectChanges();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   }
    // );    
  }

  getItemsList() {
    // this.api.getItemsList({ page: 1, limit: 1000 },"item/list").subscribe(
    //   (res) => {
    //     if(res.total){
    //       this.itemsListFreq = res.data.map((res: any) => {
    //           const result = {
    //             id: res.id,
    //             value: res.name,
    //           };
    //           return result;
    //         });
    //         this.spinner.hide();
    //     }else{
    //       this.itemsListFreq = [];
    //       this.spinner.hide();
    //     }
    //     this.change.detectChanges();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   }
    // );
  }

  getShopList() {
    this.spinner.show();
    this.shopList = [];
    this.api.getShopData({ limit: 1000, page: 1 }, "shop").subscribe(
      (res) => {
        // 
        this.shopList = res.data.map((resp: any) => {
          const result = {
            id: resp.id || 0,
            value: resp.name || "---"
          };
          return result;
        });
        this.change.detectChanges();
        this.spinner.hide();
        // 
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  onEnter() {
    this.keyList.push({ key: this.searchKey })
    this.searchKey = "";
  }

  removeKey(index) {
    this.keyList = this.shared.removeFromArrayByIndex(this.keyList, index);
  }

  getUnits() {
    this.spinner.show();
    this.api.getUnits().subscribe(
      (res) => {
        //         unitsList
        // unit

        this.unitsList = res.dataObject.map((res: any) => {
          const result = {
            id: res.id,
            value: res.title_en + ' | ' + res.title_ar
          };
          return result;
        });
        this.unitsList.unshift({ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" });
        this.spinner.hide();
        // 
        // if (res.dataObject.length > 0) {
        //   this.mainCategoryList = res.dataObject;
        //   this.mapMainCategoryData();
        // } else {
        //   this.mainCategoryList = [{ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" }];
        //   this.spinner.hide();
        // }
        // this.units = [{ id: 2, price: 50 }];
        this.change.detectChanges();

        // this.units = [{ id: 2, price: 50 }];
        // this.change.detectChanges();


      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getMainCategoryData() {
    this.spinner.show();
    this.api.getParentCategoryList().subscribe(
      (res) => {
        // 
        if (res.dataObject.length > 0) {
          this.mainCategoryList = res.dataObject;
          this.mapMainCategoryData();
        } else {
          this.mainCategoryList = [{ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" }];
          this.spinner.hide();
        }
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapMainCategoryData() {
    this.mainCategoryList = this.mainCategoryList.map((res: any) => {
      const result = {
        id: res.id,
        value: res.title_en + ' | ' + res.title_ar
      };
      return result;
    });
    this.mainCategoryList.unshift({ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" });
    this.spinner.hide();
  }

  mapSubCategoryData() {
    this.subCategoryList = this.subCategoryList.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name_ar || "---"
      };
      return result;
    });
    this.subCategoryList.unshift({ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" });
    this.spinner.hide();
  }

  mainCategoryChange(e?) {
    if (this.mainCategory == "0") {
      this.subCategoryList = [
        { id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" }
      ];
      this.subCategory = "0";
    } else {
      // 
      this.spinner.show();
      this.api.getSubCategoryList(this.mainCategory).subscribe(
        (res) => {
          // 
          if (res.length) {
            this.subCategoryList = res;
            this.mapSubCategoryData();
          } else {
            this.subCategoryList = [{ id: 0, value: this.TranslationService.isRTL() ? "-- اختر خيارا --" : "-- Select one --" }];
            this.spinner.hide();
          }
          this.change.detectChanges();
        },
        (err) => {
          this.spinner.hide();
        }
      );
      // 
    }
  }

  getData() {
    this.spinner.show();
    this.api.getItemByID(this.id).subscribe(
      (res) => {
        this.partName = res.dataObject.title_en;
        this.partName_ar = res.dataObject.title_ar;
        this.price = res.dataObject.price;
        this.mainCategory = res.dataObject.category;



        this.longDescription = res.dataObject.desc1_en;
        this.longDescriptionAr = res.dataObject.desc1_ar;


        this.shortDescription = res.dataObject.desc2_en;
        this.shortDescriptionAr = res.dataObject.desc2_ar;

        this.mainCategory = res.dataObject.category;
        this.mainCategory = res.dataObject.category;
        this.mainCategory = res.dataObject.category;

        this.isSponsored = res.dataObject.star === "1";

        if (res.dataObject.image) this.image_url = res.dataObject.image;


        setTimeout(() => {
          let units = [];
          if (res.dataObject.unitsDetails && res.dataObject.unitsDetails.length > 0) {
            for (let index = 0; index < res.dataObject.unitsDetails.length; index++) {
              units.push({ id: +res.dataObject.unitsDetails[index].id, price: res.dataObject.unitsDetails[index].price });
            }
          } else {
            units.push({
              id: 0,
              price: 0
            });
          }
          this.units = units;
          this.cdk.detectChanges();
        });

        // console.log(this.unitsList);



        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  mapData() {
    let brands: any = [];
    let fbw: any = [];
    let servicesListSelected: any = [];

    this.size = this.response?.size || "";
    this.wights = this.response?.wight || "";
    this.partName = this.response.name.en || "";
    this.partName_ar = this.response.name.ar || "";

    this.price = this.response.price || "";
    this.shortDescription = this.response.short_description.en || "";
    this.shortDescriptionAr = this.response.short_description.ar || "";
    this.longDescription = this.response.long_description.en || "";
    this.longDescriptionAr = this.response.long_description.ar || "";
    this.quantity = this.response.quantity || "";
    this.reference_id = this.response.reference_id || "";
    this.discountPrice = this.response.discount_price || 0;
    this.response.brands.forEach(element => {
      brands.push(
        {
          id: element.id,
          value: element.name.en
        }
      )
    });
    // 
    this.brand = brands;
    // this.brand = this.response.brand_id || 0;
    //     
    this.isDeals = this.response.is_deal == 1;
    // this.isSponsored = this.response.is_sponsored == 1;
    // 
    setTimeout(() => {
      this.shop = this.response?.shop_id || 0;
    });
    this.item_type = this.response?.item_type || 0;
    this.keyList = this.response?.keys || [];


    // setTimeout(() => {
    //   // bought_together_categories
    //   // just put the data in right place..
    //   this.mainCategoryFrequently = this.response?.bought_together_categories && this.response?.bought_together_categories[0] && this.response?.bought_together_categories[0]?.parent_id ? this.response?.bought_together_categories[0]?.parent_id : 0;
    //   this.mainCategoryChangeFrequently(this.mainCategoryFrequently);
    //   this.subCategoryFrequently = this.response?.bought_together_categories && this.response?.bought_together_categories[0] && this.response?.bought_together_categories[0]?.id ? this.response?.bought_together_categories[0]?.id : 0; 
    // });

    // fbw



    this.response.bought_together_items.forEach(element => {
      fbw.push(
        {
          id: element.id,
          value: element.name.en
        }
      )
    });
    this.fbw = fbw;


    this.response.bought_together_items_services.forEach(element => {
      servicesListSelected.push(
        {
          id: element.id,
          value: element.name.en
        }
      )
    });
    this.servicesListSelected = servicesListSelected;


    // subCategoryFrequently
    // mainCategoryFrequently

    // 
    if (this.response?.category?.parent_id) {
      // this.response?.category?.id
      this.mainCategory = this.response?.category?.parent_id;
      this.mainCategoryChange();
      setTimeout(() => {
        this.subCategory = this.response?.category_id;
      });
    } else {
      this.mainCategory = this.response?.category_id;
      this.mainCategoryChange();
      setTimeout(() => {
        this.subCategory = "0";
      });
    }
    //
    this.imagesFromApi = this.response?.images.map((res: any) => {
      const result = {
        id: res.id || 0,
        img: res.image || environment.defaultImg
      };
      return result;
    });
    // 
    // frequentlyBoughtWith
    setTimeout(() => {
      this.getCarCompatibility();
    });
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  getBrands() {
    this.spinner.show();
    this.brandList = [];
    this.api.getBrandData({ limit: 1000 }, "brand").subscribe(
      (res) => {
        this.brandList = res.data.map((res: any) => {
          const result = {
            id: res?.id || 0,
            value: res?.name || "---"
          };
          return result;
        });
        this.spinner.hide();
        this.change.detectChanges();
      },
      (err) => {
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );
  }

  checkOnDiscount() {
    if (this.discountPrice) {
      if (this.discountPrice == "0") {
        return true;
      }
      return this.checkValue(this.discountPrice) && (this.price > this.discountPrice);
    }
    return true;
  }

  submitForm(form) {
    this.spinner.show();
    this.isSubmitted = true;
    if (
      // true

      // ((this.isCreatePage && this.imageList.length > 0) || !this.isCreatePage) &&
      form.valid

      // ((this.isCreatePage && this.imageList.length > 0) || !this.isCreatePage) &&
      // form.valid
      // this.shop &&
      // ((this.subCategoryFrequently && this.subCategoryFrequently != "0") &&
      // this.mainCategoryFrequently && this.mainCategoryFrequently != "0") &&
      // this.checkValue(form.value.price)
      // this.checkValue(form.value.wights) &&
      // this.checkValue(form.value.size) &&
      // this.checkValue(form.value.quantity) &&
      // this.checkOnDiscount()
    ) {
      // if(form.valid && this.checkIfAtLeastOneIsSelected()){
      // const data = new FormData();
      // data.append('name', form.value.partName);
      // data.append('name_ar', form.value.partName_ar);
      // data.append('partName',form.value.partName);
      // partName_ar
      // data.append('price', form.value.price);
      // data.append('short_description', form.value.shortDescription);
      // data.append('short_description_ar', form.value.shortDescriptionAr);
      // data.append('long_description', form.value.longDescription);
      // data.append('long_description_ar', form.value.longDescriptionAr);
      // data.append('reference_id', form.value.reference_id);

      // this.brand.forEach((e, i) => {
      //   data.append(`brand_id[${i}]`, e.id);
      // })
      // 
      // if (form.value.subCategory && form.value.subCategory != "0") data.append('category_id', form.value.subCategory);
      // else data.append('category_id', form.value.mainCategory);
      //
      // if(this.subCategoryFrequently && this.subCategoryFrequently != "0") data.append('bought_together[0]',this.subCategoryFrequently);
      // else data.append('bought_together[0]',this.mainCategoryFrequently);

      // this.fbw.forEach((e, i) => {
      //   data.append(`bought_together_items[${i}]`, e.id);
      // });

      // this.servicesListSelected.forEach((e, i) => {
      //   data.append(`bought_together_services[${i}]`, e.id);
      // });

      // data.append(`bought_together_services[0]`,"test");//the next one..


      // data.append('bought_together[0]',this.subCategoryFrequently);

      // 
      // data.append('subCategory',form.value.subCategory);
      // data.append('mainCategory',form.value.mainCategory);
      // data.append('frequentlyBoughtWith',form.value.frequentlyBoughtWith);
      // data.append('quantity', this.quantity);
      // data.append('discount_price', form.value.discountPrice);
      // //
      // data.append('is_deal', this.isDeals ? "1" : "0");
      // data.append('is_sponsored', this.isSponsored ? "1" : "0");

      // data.append('size', form.value.size);
      // data.append('wight', form.value.wights);
      // data.append('item_type', form.value.item_type);
      // data.append('shop_id', form.value.shop);
      // this.keyList.forEach((element, index) => {
      //   data.append(`keys[${index}]`, element.key)
      // });
      // data.append('keys[0]',"Test Key index 0");
      //
      // for (let i = 0; i < this.imageList.length; i++) {
      //   data.append(`image[${i}]`, this.imageList[i]);
      // }
      // if (this.isEditPage) {
      //   data.append('id', this.id);
      //   data.append('_method', 'PUT');
      //   // 
      //   this.api.editItemSale(data).subscribe(
      //     (res) => {
      //       this.isSubmitted = false;
      //       this.alert.success({ title: "Item updated successfully." });
      //       this.getData();
      //       this.spinner.hide();
      //     },
      //     (err) => {
      //       // 
      //       this.alert.errorAPI(err.error.errors);
      //       this.spinner.hide();
      //       // 
      //     }
      //   );
      //   // 
      // } else if (this.isCreatePage) {
      let data = {
        title_en: form.value.partName,
        title_ar: form.value.partName_ar,
        desc1_en: form.value.longDescription,
        desc1_ar: form.value.longDescriptionAr,
        desc2_en: form.value.shortDescription,
        desc2_ar: form.value.shortDescriptionAr,
        price: form.value.price,
        category: this.mainCategory,
        units: this.getFormattedUnits(),
        star: this.isSponsored ? 1 : 0,
      };
      // const data = new FormData();
      // if (this.imageList.length > 0) data.append("image", this.imageList[0]);
      // data.append("title_en", 'x');
      // data.append("title_ar", 'x');
      // data.append("desc1_en", 'x');
      // data.append("desc1_ar", 'x');
      // data.append("desc2_en", 'x');
      // data.append("desc2_ar", 'x');
      // data.append("price", '15');
      // data.append("category", '1');
      // data.append("units", "[]");
      // data.append("star", '0');
      // data.append("title_en", form.value.partName);
      // data.append("title_ar", form.value.partName_ar);
      // data.append("desc1_en", form.value.longDescription);
      // data.append("desc1_ar", form.value.longDescriptionAr);
      // data.append("desc2_en", form.value.shortDescription);
      // data.append("desc2_ar", form.value.shortDescriptionAr);
      // data.append("price", form.value.price);
      // data.append("category", this.mainCategory);
      // data.append("units", "[]");
      // data.append("star", this.isSponsored ? '1' : '0');
      // console.log(this.imageList);
      // data["image"] = "";
      // data["image"] = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
      // 
      // if (this.imageList.length > 0) data["image"] = this.imageList[0];
      // 
      if (this.imageList.length > 0) {
        this.api.uploadFile(this.imageList[0]).subscribe(
          (res) => {
            data["image"] = res.dataObject;
            this.callCreateAPI(data);
          },
          (err) => {
            this.spinner.hide();
          }
        );
      } else {
        data["image"] = this.image_url == "./assets/media/icons/default-placeholder-image.png" ? "" : this.image_url;
        this.callCreateAPI(data);
      }


      // this.api.createItemSale(data).subscribe(
      //   (res) => {
      //     //
      //     // this.alert.success({ title: "Item created successfully." });
      //     // this.shared.redirectTo("/items-for-sale");
      //     this.spinner.hide();
      //     //
      //   },
      //   (err) => {
      //     //
      //     // this.alert.errorAPI(err.error.errors);
      //     this.spinner.hide();
      //     // 
      //   }
      // );
      // 
      // }
    } else {
      this.spinner.hide();
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  callCreateAPI(data) {
    if (this.isCreatePage) {
      this.api.createItemSale(data).subscribe(
        (res) => {
          this.alert.success({ title: "Item created successfully." });
          this.shared.redirectTo("/items-for-sale");
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    } else {
      this.api.editItemSale(data, this.id).subscribe(
        (res) => {
          this.alert.success({ title: "Item edited successfully." });
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }
  }

  cancelChanges() {
    this.mapData();
  }

  backPage() {
    this.shared.backToPreviousPage();
  }

  getTableData() {
    this.spinner.show();
    let data = {
      page: this.currentPage,
      limit: this.perPage
    };
    // this.api.getItemsList(data,'item/list').subscribe(
    //   (res) => {
    //     this.pages = Math.ceil(res.total / this.perPage);
    //     if (!this.pages) this.pages = 1;
    //     // 
    //     if(res.total){
    //       this.responseTable = res.data;
    //       this.mapTableData();
    //     }else{
    //       this.responseTable = [];
    //       this.spinner.hide();
    //     }
    //     this.change.detectChanges();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   }
    // );
  }

  mapTableData() {
    this.responseTable = this.responseTable.map((res: any) => {
      const result = {
        id: res.id,
        partName: res.name || res.name_ar || "---",
        price: (res.price || 0) + (this.TranslationService.isRTL() ? " د.ا" : " JD"),
        category: res.category || "---",
        discount_price: (res.discount_price || 0) + (this.TranslationService.isRTL() ? " د.ا" : " JD"),
        isChecked: false
      };
      return result;
    });
    this.spinner.hide();
  }

  selectPage(pageNumber) {
    this.currentPage = pageNumber;
    this.getData();
  }

  checkIfAtLeastOneIsSelected() {
    for (let index = 0; index < this.responseTable.length; index++) {
      if (this.responseTable[index].isChecked) return true;
    }
    return false;
  }

  toggleItem(item) {
    if (item.isChecked) this.removeSelectedItem(item.id);
    else this.selectedTable.push(item);
    // 
    item.isChecked = !item.isChecked;
  }

  removeSelectedItem(itemID) {
    for (let index = 0; index < this.selectedTable.length; index++) {
      if (this.selectedTable[index].id == itemID) {
        this.selectedTable = this.shared.removeFromArrayByIndex(this.selectedTable, index);
        this.cdk.detectChanges();
        break;
      }
    }
  }

  checkIfItemSelected(itemID) {
    for (let index = 0; index < this.selectedTable.length; index++) {
      if (this.selectedTable[index].id == itemID) return true;
    }
    return false;
  }

  selectFileEmiter(e) {
    this.imageList = [e.file];
    this.readURL(e.file);
    this.cdk.detectChanges();
    // for (let index = 0; index < e.file.length; index++) {
    //   this.imageList.push(e.file[index]);
    //   this.readURL(e.file[index]);
    // }
  }

  readURL(input) {
    let _this = this;
    var reader = new FileReader();
    reader.onload = function (e) {
      _this.images.push(e.target.result);
    };
    reader.readAsDataURL(input);
  }

  deleteImageFromAPI(id) {
    this.spinner.show();
    this.api.deleteImage(id).subscribe(
      (res) => {
        // 
        this.spinner.hide();
        this.getData();
        // 
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  deleteImage(index) {
    this.imageList = this.shared.removeFromArrayByIndex(this.imageList, index);
    this.images = this.shared.removeFromArrayByIndex(this.images, index);
  }

  checkValue(value) {
    if (value > 0)
      return true;
    else
      return false;
  }

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  getMainCategoryDataFrequently() {
    this.spinner.show();
    this.mainCategoryListFrequently = [];
    this.api.getParentCategoryList().subscribe(
      (res) => {
        // 
        if (res.length) {
          this.mainCategoryListFrequently = res;
          this.mapMainCategoryDataFrequently();
        } else {
          // this.mainCategoryList = [{ id: 0, value: "-- Select one --" }];
          this.spinner.hide();
        }
        this.change.detectChanges();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }

  getFilledUnits() {
    return this.units.filter(unit => unit.id && unit.price);
    // [ { "id": 0, "price": 0 }, { "id": "3", "price": "34" }, { "id": 0, "price": 0 }, { "id": 0, "price": 0 } ]
  }

  mapMainCategoryDataFrequently() {
    this.mainCategoryListFrequently = this.mainCategoryListFrequently.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name_ar || "---"
      };
      return result;
    });
    // this.mainCategoryList.unshift({ id: 0, value: "-- Select one --" });
    this.spinner.hide();
  }
  mainCategoryChangeFrequently(main_id) {
    this.mainCategoryFrequently = main_id;
    this.subCategoryListFrequently = [];
    if (this.mainCategoryFrequently == "0") {
      this.subCategoryListFrequently = [
        // { id: 0, value: "-- Select one --" }
      ];
      this.subCategoryFrequently = "0";
    } else {
      // 
      this.spinner.show();
      this.api.getSubCategoryList(this.mainCategoryFrequently).subscribe(
        (res) => {
          // 
          if (res.length) {
            this.subCategoryListFrequently = res;
            this.mapSubCategoryDataFrequently();
          } else {
            // this.subCategoryList = [{ id: 0, value: "-- Select one --" }];
            this.spinner.hide();
          }
          this.change.detectChanges();
        },
        (err) => {
          this.spinner.hide();
        }
      );
      // 
    }
  }
  mapSubCategoryDataFrequently() {
    this.subCategoryListFrequently = this.subCategoryListFrequently.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name_ar || "---"
      };
      return result;
    });
    // this.subCategoryList.unshift({ id: 0, value: "-- Select one --" });
    this.spinner.hide();
  }


  subCategoryChangeFrequently(subCategoryID) {
    this.subCategoryFrequently = subCategoryID;
  }

  unitChange(e, unit) {
    unit.id = e.srcElement.value;
  }

  changePrice(e, unit) {
    unit.price = e.srcElement.value;
  }

  addRow() {
    this.units.push({
      id: 0,
      price: 0
    });
  }

  getFormattedUnits() {
    let str = "";
    let units = this.getFilledUnits();
    for (let index = 0; index < units.length; index++) {
      if (str) str += '-';
      str += `${units[index].id},${units[index].price}`;
    }
    // console.log(units);
    // 1,5-2,10-3,17.5
    return str;
  }

  removeRow(index) {
    this.units = this.shared.removeFromArrayByIndex(this.units, index);
    // console.log(this.units);

  }

}
