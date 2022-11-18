import { SharedService } from './../shared/services/shared.service';
import { ApisService } from './../shared/services/apis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-review-images',
  templateUrl: './review-images.component.html',
  styleUrls: ['./review-images.component.scss']
})
export class ReviewImagesComponent implements OnInit {
  id:string = "";
  imageList:any;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private api: ApisService,
    private cdr: ChangeDetectorRef,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData(){
    this.spinner.show();
    this.api.reviewDetails(this.id).subscribe(
      (res) => {
        // 
        this.imageList = res.data?.images;
        this.imageList = this.imageList.map((res)=>{
          const result = {
            id: res.id || 0,
            image: res.photos || environment.defaultImg
          }
          return result;
        })
        this.cdr.detectChanges();
        this.spinner.hide();
      },
      (err) => {
        // 
        this.spinner.hide();
      }
    );
  }

  backPage(){
    this.shared.backToPreviousPage();
  }

}
