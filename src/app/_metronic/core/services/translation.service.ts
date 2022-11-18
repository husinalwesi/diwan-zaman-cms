import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService as translateS } from '../../../modules/i18n/translation.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService, private translateS: translateS) {
    this.translate.use(this.translateS.getSelectedLanguage());
  }

  t(str){
    if(!str) return "";
    let translated = this.translate.instant(str);
    return translated ? translated : '';
  }

  isRTL(){
    return this.translateS.getSelectedLanguage() == "ar" ? true : false;
  }

}
