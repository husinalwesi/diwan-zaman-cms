import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../../core';
import { AuthService, IUserInfo } from '../../../../../../modules/auth/_services/auth.service';
import { LocalStorage as ls } from "../../../../../../utils/localstorage.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown-inner',
  templateUrl: './user-dropdown-inner.component.html',
  styleUrls: ['./user-dropdown-inner.component.scss'],
})

export class UserDropdownInnerComponent implements OnInit {
  extrasUserDropdownStyle: 'light' | 'dark' = 'light';
  currentUser: any;

  constructor(private layout: LayoutService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = ls.getValue('currentUser');
    this.extrasUserDropdownStyle = this.layout.getProp(
      'extras.user.dropdown.style'
    );
  }

  logout() {
    ls.removeValue('currentUser');
    this.router.navigate(['/auth/login'], { queryParams: {}, });
  }

  checkIfObj(obj) {
    return typeof obj == "object" ? true : false;
  }

}
