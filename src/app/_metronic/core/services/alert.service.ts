import { Injectable } from '@angular/core';
import { Ng2IzitoastService } from 'ng2-izitoast';
import { TranslationService } from '../../../_metronic/core/services/translation.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private iziToast: Ng2IzitoastService, private TranslationService: TranslationService) {}
  public success(msg: { title?: string, message?: string }): void {
    this.destroy();
    this.iziToast.show({
      message: this.TranslationService.t(msg.title),
      messageColor: '#fff',
      backgroundColor: '#00af66',
      icon: 'fa fa-check-circle',
      iconColor: '#fff',
      zindex: '99999',
      layout: 1,
      balloon: true,
      close: true,
      rtl: this.TranslationService.isRTL(),
      position: this.TranslationService.isRTL() ? 'bottomLeft' : 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      target: '',
      targetFirst: true,
      timeout: 5000,
      drag: true,
      pauseOnHover: true,
      progressBar: false,
      progressBarColor: '#00af66',
      animateInside: true,
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeInUp',
      transitionOutMobile: 'fadeOutDown'
    });
  }

  public error(msg: { title?: string, message?: string }): void {
    this.destroy();
    this.iziToast.show({
      title: this.TranslationService.t(msg.title),
      titleColor: '#fff',
      message: this.TranslationService.t(msg.message),
      messageColor: '#fff',
      backgroundColor: '#e86767',
      icon: 'fa fa-times',
      iconColor: '#fff',
      zindex: '99999',
      layout: 1,
      balloon: true,
      close: true,
      rtl: this.TranslationService.isRTL(),
      position: this.TranslationService.isRTL() ? 'bottomLeft' : 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      target: '',
      targetFirst: true,
      timeout: 5000,
      drag: true,
      pauseOnHover: true,
      progressBar: false,
      progressBarColor: '#e86767',
      animateInside: true,
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeInUp',
      transitionOutMobile: 'fadeOutDown',
    });
  }

  public warning(msg: { title?: string, message?: string }): void {
    this.destroy();
    this.iziToast.show({
      message: this.TranslationService.t(msg.title),
      messageColor: '#fff',
      backgroundColor: '#ff9800',
      icon: 'fa fa-exclamation-circle',
      iconColor: '#fff',
      zindex: '99990',
      layout: 1,
      balloon: true,
      close: true,
      timeout: 0,
      rtl: this.TranslationService.isRTL(),
      position: this.TranslationService.isRTL() ? 'bottomLeft' : 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      target: '',
      targetFirst: true,
      drag: true,
      pauseOnHover: true,
      progressBar: false,
      progressBarColor: '#ff9800',
      animateInside: true,
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeInUp',
      transitionOutMobile: 'fadeOutDown'
    });
  }

  public notification(msg: { title?: string, message?: string}): void {
    this.destroy();
    this.iziToast.show({
      title: msg.title,
      message: msg.message,
      titleColor: "#ffffff",
      messageColor: 'rgba(255,255,255,0.6)',
      backgroundColor: "rgba(30,30,45,0.9)",
      icon: 'fa fa-bell',
      iconColor: '#ffffff',
      zindex: '99999',
      layout: 1,
      id: "custom-alert",
      balloon: true,
      close: false,
      rtl: this.TranslationService.isRTL(),
      position: this.TranslationService.isRTL() ? 'bottomLeft' : 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
      target: '',
      targetFirst: true,
      timeout: 5000,
      drag: true,
      pauseOnHover: true,
      progressBar: false,
      progressBarColor: '#00af66',
      animateInside: true,
      transitionIn: 'fadeInUp',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeInUp',
      transitionOutMobile: 'fadeOutDown'
    });
  }

  public errorAPI(errArr){
    if(!errArr) return false;

    for (const [key, value] of Object.entries(errArr)) {
      // console.log(`${value}`);
      this.error({ title: `${value}`});
      // console.log(`${key}: ${value}`);
    }
  }

  public destroy(): void {
    this.iziToast.destroy();
  }

}


