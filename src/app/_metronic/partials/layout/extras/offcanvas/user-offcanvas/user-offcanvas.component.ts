import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { AuthService, IUserInfo } from '../../../../../../modules/auth/_services/auth.service';
import { LocalStorage as ls } from "../../../../../../utils/localstorage.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-offcanvas',
  templateUrl: './user-offcanvas.component.html',
  styleUrls: ['./user-offcanvas.component.scss'],
})

export class UserOffcanvasComponent implements OnInit {
  currentUser: IUserInfo;
  extrasUserOffcanvasDirection = 'offcanvas-right';

  constructor(private layout: LayoutService, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUser = ls.getValue('currentUser');
    this.extrasUserOffcanvasDirection = `offcanvas-${this.layout.getProp(
      'extras.user.offcanvas.direction'
    )}`;
  }

  logout() {
    ls.removeValue('currentUser');
    this.router.navigate(['/auth/login'], { queryParams: {}, });
  }
}
