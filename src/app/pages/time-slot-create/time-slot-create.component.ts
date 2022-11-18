import { SharedService } from './../shared/services/shared.service';
import { ApisService } from './../shared/services/apis.service';
import { AlertService } from './../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-time-slot-create',
  templateUrl: './time-slot-create.component.html',
  styleUrls: ['./time-slot-create.component.scss']
})
export class TimeSlotCreateComponent implements OnInit {
  id: string = "";
  type: string = "";
  day: string = "0";
  from: string = "0";
  to: string = "0";
  status: string = "0";
  isSubmitted: boolean = false;
  redirectRoute: string = "";
  date: string = "";
  now: any;
  dayList: any = [
    {
      id: 1,
      value: "Sunday"
    },
    {
      id: 2,
      value: "Monday"
    },
    {
      id: 3,
      value: "Tuesday"
    },
    {
      id: 4,
      value: "Wednesday"
    },
    {
      id: 5,
      value: "Thursday"
    },
    {
      id: 6,
      value: "Friday"
    },
    {
      id: 7,
      value: "Saturday"
    }
  ];
  timeList: any = [
    {
      id: 1,
      value: "01:00"
    },
    {
      id: 2,
      value: "02:00"
    },
    {
      id: 3,
      value: "03:00"
    },
    {
      id: 4,
      value: "04:00"
    },
    {
      id: 5,
      value: "05:00"
    },
    {
      id: 6,
      value: "06:00"
    },
    {
      id: 7,
      value: "07:00"
    },
    {
      id: 8,
      value: "08:00"
    },
    {
      id: 9,
      value: "09:00"
    },
    {
      id: 10,
      value: "10:00"
    },
    {
      id: 11,
      value: "11:00"
    },
    {
      id: 12,
      value: "12:00"
    },
    {
      id: 13,
      value: "13:00"
    },
    {
      id: 14,
      value: "14:00"
    },
    {
      id: 15,
      value: "15:00"
    },
    {
      id: 16,
      value: "16:00"
    },
    {
      id: 17,
      value: "17:00"
    },
    {
      id: 18,
      value: "18:00"
    },
    {
      id: 19,
      value: "19:00"
    },
    {
      id: 20,
      value: "20:00"
    },
    {
      id: 21,
      value: "21:00"
    },
    {
      id: 22,
      value: "22:00"
    },
    {
      id: 23,
      value: "23:00"
    },
    {
      id: 24,
      value: "24:00"
    },
  ];
  statusList: any = [
    {
      id: 'busy',
      value: "Busy"
    },
    {
      id: 'working',
      value: "Working"
    },
    {
      id: 'closed',
      value: "Closed"
    }
  ]
  constructor(
    private TranslationService: TranslationService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private api: ApisService,
    private shared: SharedService
  ) { }

  ngOnInit(): void {
    if(this.TranslationService.isRTL()){      
      this.statusList = [
        {
          id: 'busy',
          value: "مشغول"
        },
        {
          id: 'working',
          value: "يعمل الآن"
        },
        {
          id: 'closed',
          value: "مغلق"
        }
      ]
      this.dayList = [
        {
          id: 1,
          value: "الاحد"
        },
        {
          id: 2,
          value: "الاثنين"
        },
        {
          id: 3,
          value: "الثلاثاء"
        },
        {
          id: 4,
          value: "الاربعاء"
        },
        {
          id: 5,
          value: "الخميس"
        },
        {
          id: 6,
          value: "الجمعه"
        },
        {
          id: 7,
          value: "السبت"
        }
      ];    }
    this.id = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    this.redirectRoute = this.type == "Dealership" ? 'dealership-centre-edit' : 'local-center-service-edit';
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  submitForm(form){
    this.isSubmitted = true;
    this.spinner.show();
    const data = new FormData();
    data.append("day",form.value.day);
    data.append("from",form.value.from);
    data.append("to",form.value.to);
    data.append("status",form.value.status);
    data.append("type",this.type);
    data.append("id",this.id);
    data.append("data",form.controls.day?.value == '0' ? form.value.date : null);
    // const data = {
    //   day: form.value.day,
    //   from: form.value.from,
    //   to: form.value.to,
    //   status: form.value.status,
    //   type: this.type,
    //   id: this.id
    // }
    if(form.valid
       && form.value.from !== '0'
       && form.value.to !== '0'
       && form.value.status !== '0'
       && Number(form.value.to) > Number(form.value.from)
       ){
      this.api.createTimeSlot(data).subscribe(
        (res) => {
          
          this.alert.success({ title: "Time slot created successfully." });
          this.shared.redirectTo(`/${this.redirectRoute}/${this.id}`);
          this.spinner.hide();
        },
        (err) => {
          this.alert.errorAPI(err.error.errors);
          this.spinner.hide();
        }
      )
    }
    else{
      this.spinner.hide();
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  checkValidationTime(form){
    if(Number(form.controls.to?.value) > Number(form.controls.from?.value)){
      return true;
    }else{
      return false;
    };
  };

}
