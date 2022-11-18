import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.scss']
})
export class SubscriptionPaymentComponent implements OnInit {
  duration: string = "";
  price: string = "";
  isSubmitted: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  submitForm(form){
    this.isSubmitted = true;
    if(form.valid){
      const data = {
        duration: form.value.duration,
        price: form.value.price,
      }
    }
  }

  cancelChanges(){
    
  }

}
