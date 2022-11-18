import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService, UserModel } from '../../../auth';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  user$: Observable<UserModel>;
  userNew: any = {
    pic: environment.defaultImg,
    firstname: 'xxx',
    lastname: 'xxx',
    ocupation: 'xxx',
    email: 'xxx',
    phone: 'xxx',
    address: {
      city: 'xxxx'
    }
  };
  constructor(public userService: AuthService) {
    this.user$ = this.userService.currentUserSubject.asObservable();
    // this.userService.currentUserSubject.next({
    //   id : 5,
    //   username : 'hussein',
    //   password : '23456',
    //   fullname : 'waise husin',
    //   email : 'alwesi@gmail.com',
    //   pic : './assets/media/users/default.jpg',
    //   roles : [],
    //   occupation : '',
    //   companyName : 'atomki',
    //   phone : '0791573132',
    //   address : {
    //     addressLine: 's',
    //     city: 'x',
    //     state: 's',
    //     postCode: 'as'
    //   },
    //   socialNetworks : {
    //     linkedIn: 'x',
    //     facebook: 'x',
    //     twitter: 'x',
    //     instagram: 'x'
    //   },
    //   firstname: 'as',
    //   lastname: 's',
    //   website: 's',
    //   // account information
    //   language: 'x',
    //   timeZone: 'as',
    //   communication: {
    //     email: false,
    //     sms: false,
    //     phone: false
    //   }
    // });
  }
}
