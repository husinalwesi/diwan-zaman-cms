import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-advertisements-plan',
  templateUrl: './advertisements-plan.component.html',
  styleUrls: ['./advertisements-plan.component.scss']
})
export class AdvertisementsPlanComponent implements OnInit {

  location: string = "0";
  url: string = "";
  isSubmitted: boolean = false;
  image_url: string = environment.defaultImgEle;
  file: any = null;
  desiredPlan: string = "0";
  desiredPlanSponsored: string = "0";
  desiredCarPart: string = "0";
  desiredAdvertisementPlan: string = "0";
  locationList: any = [
    {
      id: 1,
      name: "Amman"
    },
    {
      id: 2,
      name: "Zarqa"
    }
  ];
  desiredPlanList: any = [
    {
      id: 1,
      name: "Test"
    }
  ];
  desiredPlanSponsoredList: any = [
    {
      id: 1,
      name: "Test"
    }
  ];
  desiredCarPartList: any = [
    {
      id: 1,
      name: "Test"
    }
  ];
  desiredAdvertisementPlanList : any = [
    {
      id: 1,
      name: "Test"
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  submitForm(form){
    this.isSubmitted = true;
    if(form.valid){
      const data = {
        location: form.value.location,
        duration: form.value.duration,
        price: form.value.price,
        image: this.file
      }
    }
  }

  cancelChanges(){
    
  }

  selectFileEmiter(e){
    this.file = e.file;
    console.log(this.file);
  }

}
