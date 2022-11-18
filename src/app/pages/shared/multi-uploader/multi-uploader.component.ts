import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApisService } from '../../shared/services/apis.service';
import { SharedService } from '../../shared/services/shared.service';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from "src/app/_metronic/core/services/alert.service";

@Component({
  selector: 'app-multi-uploader',
  templateUrl: './multi-uploader.component.html',
  styleUrls: ['./multi-uploader.component.scss']
})
export class MultiUploaderComponent implements OnInit {

  showFlag: boolean = false;
  imageObject: Array<object> = [];
  image: any;
  imgExistence: boolean = false;
  maximumFileUpload: number = 3;

  @Input() image_url: any;
  @Input() accept: string;
  @Input() from_feature: string;
  @Input() isDisabled: any;
  @Input() isRequired: any;
  @Input() isSubmitted: any;
  @Input() isTextAppear: any;
  @Input() isOpened: boolean;
  @Output() selectFileEmiter: EventEmitter<any> = new EventEmitter();

  constructor(
    private api: ApisService,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    this.isRequired = this.sharedService.stringToBoolean(this.isRequired);
    this.isSubmitted = this.sharedService.stringToBoolean(this.isSubmitted);
    this.isTextAppear = this.sharedService.stringToBoolean(this.isTextAppear);
    this.isDisabled = this.sharedService.stringToBoolean(this.isDisabled);
  }

  ngOnChanges(changes) {
    if(this.isOpened){
      document.getElementById("file-change").click();
    }
  }

  readURL(input) {
    let _this = this;
    var reader = new FileReader();
    reader.onload = function (e) {
      _this.image_url = e.target.result;
    };
    reader.readAsDataURL(input);
  }

  selectFile(event) {    
    if(!event.target.files || !event.target.files[0] || event.target.files[0].length == 0) return;
    //
    let temp_file_size_mb = 0;
    // event.target.files.forEach(element => {
    //   temp_file_size_mb = ~~(element / 1024 / 1024);
    // }); 

    for (let index = 0; index < event.target.files.length; index++) {
      temp_file_size_mb = temp_file_size_mb + (event.target.files[index].size / 1024 / 1024);
      
    }
    // let temp_file_size_mb = ~~(event.target.files[0].size / 1024 / 1024);
    if(temp_file_size_mb > this.maximumFileUpload){
      console.log("max size")
      return;
    } 
    // 
    // this.spinner.show();
    let file = event.target.files;
    this.image = file[0];
    // this.readURL(file[0]);
    this.selectFileEmiter.emit({file:file});

    // let data = new FormData();
    // data.append('from_feature', this.from_feature);
    // data.append('type', "image");
    // data.append('file', file, file.name);    
    // 
    // console.log(file);
    // 
    // this.api.uploadMedia(data).subscribe(
    //   (res) => {
    //     this.image = res.results.uuid;
    //     this.imgExistence = true;
    //     this.selectFileEmiter.emit({file:this.image});
    //     this.image_url = res.results.url;
    //     this.spinner.hide();
    //   },
    //   (err) => {
    //     // 
    //     this.alert.errorAPI(err.error.errors);
    //     this.spinner.hide();
    //   }
    // );
  }
  
  replaceDots(text){
    if(text.indexOf(".") !== -1) return " " + text.replaceAll(".","");
    return " " + text;
  }
}
