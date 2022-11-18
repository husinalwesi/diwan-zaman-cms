import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TranslationService } from './modules/i18n/translation.service';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as arLang } from './modules/i18n/vocabs/ar';
// import { locale as chLang } from './modules/i18n/vocabs/ch';
// import { locale as esLang } from './modules/i18n/vocabs/es';
// import { locale as jpLang } from './modules/i18n/vocabs/jp';
// import { locale as deLang } from './modules/i18n/vocabs/de';
// import { locale as frLang } from './modules/i18n/vocabs/fr';
// import { SplashScreenService } from './_metronic/partials/layout/splash-screen/splash-screen.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { TableExtendedService } from './_metronic/shared/crud-table';
import { SharedService } from './pages/shared/services/shared.service';
import { ApisService } from './pages/shared/services/apis.service';
// import { AlertService } from './_metronic/core/services/alert.service';
// import { Ng2IzitoastService } from 'ng2-izitoast';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  showMessage: boolean = false;
  messageText: string = "";

  showFlag: boolean = false;
  imageObject: Array<object> = [];
  // 
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  @ViewChild('audio') audio: ElementRef;
  constructor(
    private translationService: TranslationService,
    // private splashScreenService: SplashScreenService,
    private router: Router,
    private tableService: TableExtendedService,
    private shared: SharedService,
    // private iziToast: Ng2IzitoastService
    private api: ApisService,
    private cdk: ChangeDetectorRef
    // private alert: AlertService,
  ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      // arLang,
      // chLang,
      // esLang,
      // jpLang,
      // deLang,
      // frLang
    );
  }

  ngOnInit() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // clear filtration paginations and others
        this.tableService.setDefaults();
        // hide splash screen
        // this.splashScreenService.hide();

        // scroll to top on every route change
        window.scrollTo(0, 0);

        // to display back the body content
        setTimeout(() => {
          document.body.classList.add('page-loaded');
        }, 500);
      }
    });
    this.unsubscribe.push(routerSubscription);
    this.setHtmlDirection(this.translationService.getSelectedLanguage());
    this.showFullScreenSubjectHandler();
    // this.shared.notification();

    this.getOrders();
    // this.shared.redirectTo("/dashboard");
  }

  showMessageP(messageText) {
    this.playSound();
    this.showMessage = true;
    this.messageText = messageText;
    this.cdk.detectChanges();
    let _this = this;
    setTimeout(function () {
      _this.showMessage = false;
      _this.messageText = "";
      _this.cdk.detectChanges();
    }, 5000);
  }

  redirectToData() {

    if (window.location.href.indexOf("dashboard") !== -1) {
      location.reload();

    } else {
      this.shared.redirectTo("/dashboard");
    }
    // window.location.href = `${window.location.host}/admin#/dashboard`;
  }

  playSound() {
    console.log(this.audio.nativeElement);
    
    this.audio.nativeElement.play();
  }

  getOrders() {

    let _this = this;
    setInterval(function () {

      _this.api.isThereNewOrders().subscribe(
        (res) => {
          if (res.status === "200") {
            _this.showMessageP(res.msg);
          }
        },
        (err) => {
        }
      );

    }, 60000);
  }

  setHtmlDirection(lang: string) {
    let htmlTag = document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
    htmlTag.lang = lang;
    htmlTag.classList.add(lang === "ar" ? "rtl" : "ltr");
    this.importRtlCss(lang);
  }

  importRtlCss(lang: string) {
    if (lang !== "ar") return false;
    let newLink = document.createElement("link");
    newLink.rel = "stylesheet";
    newLink.type = "text/css";
    newLink.href = "./assets/sass/style.angular.rtl.css";
    document.head.appendChild(newLink);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  showFullScreenSubjectHandler() {
    let _this = this;
    this.shared.imageFullView$.subscribe(event => {
      if (event) {
        _this.imageObject[0] = {
          image: event,
          thumbImage: event,
          title: ''
        };
        _this.showFlag = true;
      }
    });
    // 
    this.shared.imageFullViewAlbum$.subscribe(event => {
      if (event.length) {
        for (let index = 0; index < event.length; index++) {
          _this.imageObject.push({
            image: event[index],
            thumbImage: event[index],
            title: ''
          });
        }
        _this.showFlag = true;
      }
    });
  }

  hideFullScreen() {
    this.showFlag = false;
    this.shared.showImageFullView("");
    this.shared.showImageFullViewAlbum([]);
  }

}
