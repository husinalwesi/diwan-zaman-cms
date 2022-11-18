import { SharedService } from './../shared/services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from './../../_metronic/core/services/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApisService } from './../shared/services/apis.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslationService } from "src/app/_metronic/core/services/translation.service";

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.scss']
})
export class SubjectEditComponent implements OnInit {

  isSubmitted: boolean = false;
  id: string = "";
  subjectEn: string = "";
  subjectAr: string = "";
  type: string = "-1";
  isCreatePage: boolean= false;
  isEditPage: boolean= false;
  isViewPage: boolean= false;
  response: any;
  typeList: any = [
    {
      id:0,
      name: "Refunds"
    },
    {
      id: 1,
      name: "Reports"
    }
  ];
  constructor(
    private TranslationService: TranslationService,
    private api: ApisService,
    private change: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private route: ActivatedRoute,
    private shared: SharedService
    ) {
  }

  ngOnInit(): void {
    if(this.TranslationService.isRTL()){      
      this.typeList = [
        {
          id:0,
          name: "المبالغ المستردة"
        },
        {
          id: 1,
          name: "التقارير"
        }
      ];
    }
    this.isCreatePage = window.location.href.indexOf("subjects-create") !== -1;
    this.isEditPage = window.location.href.indexOf("subjects-edit") !== -1;
    this.isViewPage = window.location.href.indexOf("subject-view") !== -1;
    this.id = this.route.snapshot.paramMap.get('id');
    // 
    if(!this.isCreatePage) this.getData();
    // 
  }

  getData(){
    this.spinner.show();
    this.api.getSubjectByID(this.id).subscribe(
      (res) => { 
        this.response = res;
        this.mapData();
      },
      (err) => {
        if (err.error.errors) this.alert.errorAPI(err.error.errors);
        else this.alert.error({ title: err.error.message });
        this.spinner.hide();
      }
    );
  }

  mapData(){
    this.subjectEn = this.response.data.subject.en,
    this.subjectAr = this.response.data.subject.ar;
    this.type = this.response.data.type;
    // 
    this.change.detectChanges();
    this.spinner.hide();
  }

  submitForm(form){
    this.spinner.show();
    this.isSubmitted = true;
    if(form.valid && form.value.type != "-1"){
      // 
      let data = new FormData();
      data.append('subject', form.value.subjectEn);
      data.append('subject_ar', form.value.subjectAr);
      data.append('type', form.value.type);
      // 
      if(this.isEditPage){
        data.append('id', this.id);
        data.append('_method', "PUT");
        // 
        this.api.updateSubject(data).subscribe(
          (res) => {
            this.isSubmitted = false;
            this.alert.success({ title: "Subject updated successfully." });
            this.getData();
            this.spinner.hide();
          },
          (err) => {
            if (err.error.errors) this.alert.errorAPI(err.error.errors);
            else this.alert.error({ title: err.error.message });
            this.spinner.hide();
          }
        );
        // 
      }else if(this.isCreatePage){
        this.api.createSubject(data).subscribe(
          (res) => {
            //
            this.alert.success({ title: "Subject created successfully." });
            this.shared.redirectTo("/subjects");
            this.spinner.hide();
            //
          },
          (err) => {
            if (err.error.errors) this.alert.errorAPI(err.error.errors);
            else this.alert.error({ title: err.error.message });
            this.spinner.hide();
          }
        );
        // 
      }
    }else{
      this.spinner.hide();
      this.alert.error({ title: 'SHARED.PLEASE_MAKE_SURE_ALL_THE_INPUT_FIELDS_ARE_VALID' });
    }
  }

  cancelChanges(){
    this.mapData();
  }
  
  backPage(){
    this.shared.backToPreviousPage();
  }

}
