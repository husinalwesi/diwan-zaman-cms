import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  currentYear: string;
  // isPaymentPage: boolean = false;
  constructor(
    private router: Router
  ) {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear().toString();
    // this.router.events.subscribe((event) => {
    //   if(event["url"] && event["url"].indexOf("payment") !== -1) this.isPaymentPage = true;
    //   else this.isPaymentPage = false;
    // });
  }

  ngOnInit(): void {
  }

}
