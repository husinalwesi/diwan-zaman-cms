import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LocalStorage as ls } from '../../../utils/localstorage.service';
import { HeadersService } from '../../../pages/shared/services/headers.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  tempBaseURL: string = "https://dev-insurdoo.designinjo.com/api/admin";
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private httpClient: HttpClient,
    private header: HeadersService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  logout() {
    if (ls.getValue('currentUser')) {
      this.httpClient.post<any>(`${environment.apiUrl}/auth/logout`, new FormData(), {
        headers: this.header.getHeadersWithAuthAPI()
      }).subscribe(
        (res) => {
          ls.removeValue('currentUser');
          this.router.navigate(['/auth/login'], { queryParams: {}, });
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.router.navigate(['/auth/login'], { queryParams: {}, });
    }
  }


  loginCustom(body) {
    return this.httpClient.get<any>(`${environment.apiUrl}signIn`,
      {
        params: body
      });
  }

  loginCustomShop(body) {
    return this.httpClient.post<any>(`${environment.apiUrl}/auth/shop/login`, body);
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}


export interface IUserInfo {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: any;
  media: string;
  location: string;
  longitude: string;
  latitude: string;
  phone_number: string;
  gender: number;
  DOB: string;
  status: number;
  auto_detect_location: number;
  allow_email_notifications: number;
  created_at: string;
  updated_at: string;
}