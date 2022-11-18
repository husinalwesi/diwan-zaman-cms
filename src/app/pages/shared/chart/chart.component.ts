import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { LayoutService } from '../../../_metronic/core';
import { ApisService } from '../../shared/services/apis.service';
import { NgxSpinnerService } from "ngx-spinner";
import { TranslationService } from '../../../_metronic/core/services/translation.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  response: any;
  // 
  // 
  demo: boolean = true;
  // 
  // 
  userCount: any;
  donateActive: any;
  donateAll: any;
  receiving: any;
  // 
  chartData: any;
  isChartDataExist: boolean = false;
  // 
  @Input() cssClass = '';
  @Input() chartColor = 'info';

  @Input() cardtitle : string;
  @Input() chartDataParameter : string;

  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  colorsThemeBaseColor = '';
  colorsThemeLightColor = '';

  constructor(
    private layout: LayoutService,
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private TranslationService: TranslationService
    ) {
  }

  setupLayoutProps() {
    this.fontFamily = this.layout.getProp('js.fontFamily');
    this.colorsGrayGray500 = this.layout.getProp('js.colors.gray.gray500');
    this.colorsGrayGray200 = this.layout.getProp('js.colors.gray.gray200');
    this.colorsGrayGray300 = this.layout.getProp('js.colors.gray.gray300');
    this.colorsThemeBaseDanger = this.layout.getProp(
      'js.colors.theme.base.danger'
    );
    this.colorsThemeBaseColor = this.layout.getProp(
      `js.colors.theme.base.${this.chartColor}`
    );
    this.colorsThemeLightColor = this.layout.getProp(
      `js.colors.theme.light.${this.chartColor}`
    );
  }

  ngOnInit(): void {
    this.getData();
    this.setupLayoutProps();
    // this.chartOptions = this.getChartOptions();
  }

  getData(){
    this.spinner.show();
    if(this.demo) return false;

    let data;
    this.api.getDashboardData(data).subscribe(
      (res) => {
        // 
        this.response = res;
        this.mapData();
        // 
      },
      (err) => {
        // 
      }
    );
  }

  formatJson(json,key_arr){
    let temp_arr = [];
    let i = 0;
    for (const [key, value] of Object.entries(json)) {
      // 
      let temp_count = value[key_arr] || 0;
      // 
      let temp_obj = {
        date: value["created_at"],
        count: temp_count
      };

      temp_arr[i] = temp_obj;
      i++;
    }
    return temp_arr;
  }

  mapData(){
    let key = this.chartDataParameter == "userCount" ? "user_count" : "donate_count";
    this.chartData = this.response.results[this.chartDataParameter];
    this.chartData = this.formatJson(this.chartData,key);
    this.isChartDataExist = this.chartData.length ? true : false;
    // 
    this.chartOptions = this.getChartOptions(this.chartData);
    // console.log(this.chartDataParameter);
    // console.log(this.chartData);
    // console.log(key);
    // console.log("---------------");
    // 
    // console.log(this.chartData);
    

    this.spinner.hide();
    this.change.detectChanges();
  }

  getArrayByKey(data,key){
    let temp_Arr = [];
    for (let index = 0; index < data.length; index++) {
      temp_Arr.push(data[index][key]);
    }
    return temp_Arr;
  }

  getChartOptions(data) {
    if(!this.isChartDataExist) return false;
    // 
    const height = '120px';
    return {
      series: [{
        name: this.TranslationService.t('SHARED.COUNT'),
        // name: 'Net Profit',
        data: this.getArrayByKey(data,"count") //values in the chart
        // data: [20, 22, 30, 28, 25, 26, 30, 28, 22, 24, 25, 35, 20, 22, 30, 28, 25, 26, 30, 28, 22, 24, 25, 35, 20, 22, 30, 28, 25, 26, 30]
        // data: [20, 22, 30, 28, 25, 26, 30, 28, 22, 24, 25, 35] //values in the chart
      }],
      chart: {
        type: 'area',
        height,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
        opacity: 1,
        gradient: {

          type: 'vertical',
          shadeIntensity: 0.55,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.2,
          stops: [25, 50, 100],
          colorStops: []
        }
      },
      stroke: {
        curve: 'smooth',
        show: true,
        width: 3,
        colors: [this.colorsThemeBaseColor]
      },
      xaxis: {
        categories: this.getArrayByKey(data,"date"),
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        },
        crosshairs: {
          show: false,
          position: 'front',
          stroke: {
            color: this.colorsGrayGray300,
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      yaxis: {
        min: 0,
        max: 37,
        labels: {
          show: false,
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily
        },
        y: {
          formatter: (val) => {
            return `${val}`;
            // return `$ ${val} thousands`;
          }
        }
      },
      colors: [this.colorsThemeLightColor],
      markers: {
        colors: [this.colorsThemeLightColor],
        strokeColor: [this.colorsThemeBaseColor],
        strokeWidth: 3
      },
      padding: {
        top: 0,
        bottom: 0
      }
    };
  }
}
