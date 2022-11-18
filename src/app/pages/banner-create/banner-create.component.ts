import { map } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../pages/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { ApisService } from '../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.scss']
})

export class BannerCreateComponent implements OnInit {
  response: any;
  isSubmitted: boolean = false;
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  id: string = "0";
  image: any;
  imageName: string;
  image_url: any = environment.defaultImgEle;
    // 
  title: string;
  item_id: string = "0";
  itemList: any = [];
  position: string = "0";
  positionList: any = [
    {id: 1, value: "Top"},
    {id: 2, value: "Bottom"}
  ];
  shopList: any = [];
  shop: string = "0";
  type: string = "1";
  // 
  constructor(
    private spinner: NgxSpinnerService,
    private change: ChangeDetectorRef,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService,
    private api: ApisService,
    private TranslationService: TranslationService,    
    ){}

  ngOnInit(): void {
    if(this.TranslationService.isRTL()){      
      this.positionList = [
        {id: 1, value: "اعلى"},
        {id: 2, value: "اسفل"}
      ];
  }  
    this.isCreatePage = window.location.href.indexOf("banner-create") !== -1;
    this.isEditPage = window.location.href.indexOf("banner-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("banner-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    //
    
    if(this.isCreatePage) this.getItemsData();
    else this.getData();
  }

  getShopList(){
    this.spinner.show();
    this.shopList = [];
    this.api.getShopData({limit: 1000, page: 1},"shop").subscribe(
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

  getData(from?){
    this.spinner.show();
    this.api.getBannerByID(this.id).subscribe(
      (res) => {
        // 
        this.response = res;
        this.mapData();
        if(from !== 'update')
          // this.getFilter();
          this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        // 
      }
    );
  }

  mapData(){
    this.image = null;
    this.image_url = this.response.data.image || environment.defaultImgEle;
    // å
    this.type = this.response.data.type ? this.response.data.type.toString() : "1";

    if(this.type == "1") this.getItemsData();
    else this.getShopList();    

    setTimeout(() => {
      if(this.type == "1") this.item_id = this.response.data.type_id;
      else this.shop = this.response.data.type_id;    
    });

    this.title = this.response.data.name;

    this.position = this.response.data.position || 0;
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  handleType(){
    if(this.type == "1" && this.item_id != "0") return true;
    else if(this.type == "5" && this.shop != "0") return true;
    return false;
  }

  submitForm(form){
    this.isSubmitted = true;
    if(form.valid
      && this.position != "0"
      && this.handleType()
      ){
      this.spinner.show();
      const data = new FormData();
      data.append("name", form.value.title);
      if(this.image) data.append("image", this.image, this.imageName);
      // data.append("item_id", form.value.item_id);
      data.append("type", this.type);
      // 
      if(this.type == "1") data.append("type_id", this.item_id);
      else data.append("type_id", this.shop);

      data.append("item_id", this.type == "1" ? this.item_id : this.shop);

      data.append("position", form.value.position);
      // 
      if(this.isEditPage){
        data.append("id", this.id);
        data.append("_method", "PUT");
        // 
        this.api.updateBanner(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: 'Banner updated successfully.' });
            this.getData('update');
            this.spinner.hide();
          },
          (err) => {
            // 
            this.alert.errorAPI(err.error.errors);
            this.spinner.hide();
            // 
          }
        );
        // 
      }else if(this.isCreatePage){
        // 
        if(!this.image){
          this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
          this.spinner.hide();
          return false;          
        }
        // 
        this.api.createBanner(data).subscribe(
          (res) => {
            this.alert.success({ title: 'Banner created successfully.' });
            this.shared.redirectTo("banner");
            // 
            this.spinner.hide();
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
    }else{
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  backPage(){
    this.shared.backToPreviousPage();
  }

  cancelChanges(){
    this.mapData();
  }

  selectFileEmiter(e) {
    this.image = e.file;
    this.imageName = e.file_name;
  }


  getItemsData(){
    this.spinner.show();
    this.itemList = [];
    // this.api.getItemsList({limit: 1000},"item/list").subscribe(
    //   (res) => {
    //     // 
    //     if(res?.total){
    //       this.itemList = res;
    //       this.mapItemsData();
    //     }else{
    //       this.itemList = [];
    //       this.spinner.hide();
    //     }
    //     this.change.detectChanges();
    //   },
    //   (err) => {
    //     this.spinner.hide();
    //   }
    // );
  }

  mapItemsData(){
    this.itemList = this.itemList.data.map((res: any) => {
      const result = {
        id: res.id,
        value: res.name || "---"
      };
      return result;
    });
    this.spinner.hide();
  }

  changeType(){
    if(this.type == '1'){//items
      this.getItemsData();
    }else{//shop
      this.getShopList();      
    }
  }

}
  