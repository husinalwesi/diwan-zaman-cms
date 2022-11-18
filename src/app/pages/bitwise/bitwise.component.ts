import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-bitwise',
  templateUrl: './bitwise.component.html',
  styleUrls: ['./bitwise.component.scss']
})
export class BitwiseComponent implements OnInit {
  @Output() bitWiseEmiter: EventEmitter<any> = new EventEmitter();
  @Input() totalBitWise: number = 0;
  @Input() isViewPage: boolean;
  daysBitwise: any = [
    {
      dayNum: 0,
      dayText: 'sunday',
      isChecked: false,
      dayBitWiseCalculated: 1 //Math.pow(2,0)
    },
    {
      dayNum: 1,
      dayText: 'monday',
      isChecked: false,
      dayBitWiseCalculated: 2 //Math.pow(2,1)
    },
    {
      dayNum: 2,
      dayText: 'tuesday',
      isChecked: false,
      dayBitWiseCalculated: 4 //Math.pow(2,2)
    },
    {
      dayNum: 3,
      dayText: 'wednesday',
      isChecked: false,
      dayBitWiseCalculated: 8 //Math.pow(2,3)
    },
    {
      dayNum: 4,
      dayText: 'thursday',
      isChecked: false,
      dayBitWiseCalculated: 16 //Math.pow(2,4)
    },
    {
      dayNum: 5,
      dayText: 'friday',
      isChecked: false,
      dayBitWiseCalculated: 32 //Math.pow(2,5)
    },
    {
      dayNum: 6,
      dayText: 'saturday',
      isChecked: false,
      dayBitWiseCalculated: 64 //Math.pow(2,6)
    }
  ];
  constructor(private TranslationService: TranslationService) { }

  ngOnInit(): void {
    this.isViewPage = typeof this.isViewPage !== 'undefined' ? this.isViewPage : false;
    if(this.TranslationService.isRTL()){      
      this.daysBitwise = [
        {
          dayNum: 0,
          dayText: 'الاحد',
          isChecked: false,
          dayBitWiseCalculated: 1 //Math.pow(2,0)
        },
        {
          dayNum: 1,
          dayText: 'الاثنين',
          isChecked: false,
          dayBitWiseCalculated: 2 //Math.pow(2,1)
        },
        {
          dayNum: 2,
          dayText: 'الثلاثاء',
          isChecked: false,
          dayBitWiseCalculated: 4 //Math.pow(2,2)
        },
        {
          dayNum: 3,
          dayText: 'الاربعاء',
          isChecked: false,
          dayBitWiseCalculated: 8 //Math.pow(2,3)
        },
        {
          dayNum: 4,
          dayText: 'الخميس',
          isChecked: false,
          dayBitWiseCalculated: 16 //Math.pow(2,4)
        },
        {
          dayNum: 5,
          dayText: 'الجمعه',
          isChecked: false,
          dayBitWiseCalculated: 32 //Math.pow(2,5)
        },
        {
          dayNum: 6,
          dayText: 'السبت',
          isChecked: false,
          dayBitWiseCalculated: 64 //Math.pow(2,6)
        }
      ];
  }    
  }

  ngOnChanges(changes: SimpleChange): void {
    if(this.totalBitWise) this.setCheckedCheckBoxes();
  }

  setCheckedCheckBoxes(){    
    for (let index = 0; index < this.daysBitwise.length; index++) {
      this.daysBitwise[index].isChecked = (Math.pow(2,this.daysBitwise[index].dayNum) & this.totalBitWise) == Math.pow(2,this.daysBitwise[index].dayNum);
    }
  }

  checkBoxChangeEvent(day){
    day.isChecked = !day.isChecked;
    this.totalBitWise = this.gitTotalBitwiseDependsOnSelection();
    this.bitWiseEmiter.emit(this.totalBitWise);
  }

  gitTotalBitwiseDependsOnSelection(){
    let sum = 0;
    for (let index = 0; index < this.daysBitwise.length; index++) {
      if(this.daysBitwise[index].isChecked){
        sum+= this.daysBitwise[index].dayBitWiseCalculated;
      }
    }
    return sum;
  }

}
