import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorage as ls } from "../../../utils/localstorage.service";
import { TranslationService } from 'src/app/modules/i18n/translation.service';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor(private translationService: TranslationService) { }

  getHeadersAPI(){
    let headerObj = {
      "Accept" : "application/json",
      "Content-Type": "multipart/form-data",      
      "Accept-Language" : this.translationService.getSelectedLanguage()
    };
    if(ls.getValue("currentUser")) headerObj["Authorization"] = `${ls.getValue("currentUser").Authorization}`;
    return new HttpHeaders(headerObj);
  }

  getHeadersWithAuthAPI(){
    let headerObj = {
      "Accept" : "application/json",
      // "Content-Type": "multipart/form-data",      
      "Accept-Language" : this.translationService.getSelectedLanguage()
    };
    if(ls.getValue("currentUser")) headerObj["Authorization"] = `${ls.getValue("currentUser").Authorization}`;
    return new HttpHeaders(headerObj);
  }

  getHeadersWithFileAPI(){
    let headerObj = {
      "Accept" : "application/json",
      "Accept-Language" : this.translationService.getSelectedLanguage()
    };
    if(ls.getValue("currentUser")) headerObj["Authorization"] = `${ls.getValue("currentUser").Authorization}`;
    return new HttpHeaders(headerObj);
  }

  getHeadersLoginAPI(){
    let headerObj = {

      // 'Content-Type': 'application/json',
// 'Content-Type': 'application/json',
// 'Accept-Language': ['en-US', 'en', 'q=0.9'],
// 'Accept': ['application/json', 'text/plain', '*/*'],
// 'Athorization', 'Include',

      // "Accept" : "application/json",
      // "Content-Type": "multipart/form-data",      
      "Accept-Language" : this.translationService.getSelectedLanguage()
      // "Access-Control-Allow-Origin": "http://localhost:4200",
      // "Access-Control-Allow-Credentials": "true"
      // Please append headers in angular request headers.append('Access-Control-Allow-Origin', 'http://localhost:8000'); headers.append('Access-Control-Allow-Credentials', 'true');



    };
    // if(ls.getValue("currentUser")) headerObj["Authorization"] = `${ls.getValue("currentUser").Authorization}`;
    return new HttpHeaders(headerObj);
  }
}