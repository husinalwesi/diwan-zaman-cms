import { Component, OnInit } from '@angular/core';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-busy-status',
  templateUrl: './busy-status.component.html',
  styleUrls: ['./busy-status.component.scss']
})
export class BusyStatusComponent implements OnInit {
  status: string = "0";
  dayFrom: string = "";
  dayTo: string = "";
  isSubmitted: boolean = false;
  statusList: any = [
    {
      id: 1,
      name: "Busy"
    },
    {
      id: 1,
      name: "Available"
    }
  ]
  constructor(private TranslationService: TranslationService) { }

  ngOnInit(): void {
    // if(this.TranslationService.isRTL()){      
    //   this.userTypeList = [
    //     { id: 1, name: "آدمن" },
    //     { id: 2, name: "مستخدم" }
    //   ];
    // }
  }

  submitForm(form){
    this.isSubmitted = true;
    if(form.valid){
      const data = {
        dayFrom: form.value.dayFrom,
        dayTo: form.value.dayTo,
        status: form.value.status
      }
    }
  }
  cancelChanges(){
    
  }

}
