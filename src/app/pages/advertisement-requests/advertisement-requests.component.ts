import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-advertisement-requests',
  templateUrl: './advertisement-requests.component.html',
  styleUrls: ['./advertisement-requests.component.scss']
})
export class AdvertisementRequestsComponent implements OnInit {
  location: string = "0";
  duration: string = "";
  price: string = "";
  isSubmitted: boolean = false;
  image_url: string = environment.defaultImgEle;
  file: any = null;
  locationList: any = [
    {
      id: 1,
      name: "Amman"
    },
    {
      id: 2,
      name: "Zarqa"
    }
  ]
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
