import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ApisService } from '../shared/services/apis.service';
import { SharedService } from '../shared/services/shared.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_metronic/core/services/alert.service';
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  pages: number = 1;
  currentPage: number = 1;
  perPage: number = 10;
  response: any = [];

  constructor(
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private shared: SharedService
    ){}

    ngOnInit(): void {
      this.getData();
    }
  
    getData(){
      this.response = [];
      this.spinner.show();
      let data = {
        limit: this.perPage,
        page: this.currentPage,
      };
      this.api.getAnnouncementsData(data).subscribe(
        (res) => {
          // 
          if(res.total) this.response = res;
          this.pages = Math.ceil(res.total / this.perPage);
          if (!this.pages) this.pages = 0;
          // 
          this.mapData();
          this.spinner.hide();            
          this.change.detectChanges();
          // 
        },
        (err) => {
          this.spinner.hide();
        }
      );
    }

    mapData(){
      if(this.pages){
        this.response = this.response.data.map((res: any) => {
          let via = "";
          if(res.via_notifications && res.via_email) via = "Notifications | Email";
          else if(res.via_notifications) via = "Notifications";
          else if(res.via_email) via = "Email";
          else via = "---";
          // 
          const result = {
            title: res.title || "---",
            text: res.text || "---",
            via: via,
            item_id: res.item_id || '---'
          };
          // 
          return result;
        });
      }
      this.spinner.hide();
    }

    selectPage(pageNumber) {
      this.currentPage = pageNumber;
      this.getData();
    }

}
  