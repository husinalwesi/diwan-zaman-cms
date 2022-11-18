import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/pages/shared/services/shared.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  height: string = "auto";
  paymentObj: any;
  data_url: any;
  constructor(
    private SharedService: SharedService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
      this.spinner.show();
      // let paymentObj = this.SharedService.paymentURL$.value;      
      this.paymentObj = {
        payment_url: 'https://parvice-web.designinjo.com/api/admin/shop/payment',
        // payment_url: 'https://parvice-web.designinjo.com/api/admin/payment',       
        // https://parvice-web.designinjo.com/api/admin/shop/payment 
        shop_id: 20,
        type: 1
      };
      
      if(!this.paymentObj?.payment_url || !this.paymentObj?.shop_id) this.SharedService.redirectTo("auth/login");
      // this.openPayment(this.paymentObj);
      // https://parvice-web.designinjo.com/api/admin/shop/payment?shop_id=20&type=1
  }


  openPayment(paymentObj){
    let Authorization = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjJiNmNkOGViNDk2OTlhYTAyYjZhNmQzNGY4MTIxYzI3NDk5ZTM3MTllMGJiYmFkNTdmYTIyZjYxOWFhMzc2NjNjMjM3YzRmMzIzMmY1MWI2In0.eyJhdWQiOiIxNiIsImp0aSI6IjJiNmNkOGViNDk2OTlhYTAyYjZhNmQzNGY4MTIxYzI3NDk5ZTM3MTllMGJiYmFkNTdmYTIyZjYxOWFhMzc2NjNjMjM3YzRmMzIzMmY1MWI2IiwiaWF0IjoxNjM4MzA2MjA4LCJuYmYiOjE2MzgzMDYyMDgsImV4cCI6MTY2OTg0MjIwOCwic3ViIjoiOTk2Iiwic2NvcGVzIjpbXX0.pVULXpHW9rGCsom_dumlb9nvhgjggCJAhbXOOyRQmedPUOssS6y3A68FENXWlrRR9RAYCTUEB9aiMZv2sVHbhcJlsMs_Mtahj6Sh21BSG0OSFpl71SMaVy8WcadbQeiImVcC0DPdiqbtRfRgWcsPtUsgOFGjGZ38kWkZuaipOu0hXlKKVUMRZOxG6BAssw60BsBXE7Glz22Bj4xM2wT8Hpf7IbZ2eRUxpUZUe9RJ9JAEvTrXSvqqRfC2PHUj0bXd6X3wyJCVeATrf11Vtl6UvR1g0LU3hCc7MSKK0V-mLL5pFCOB8qZtZcxxoJa399tZtGmBcdX1LFHbVIC55WqNLUE4jehUNmDewRRP4Mk9g8QHvUdJp8ATg7PyxDR64PqTfb2ShjHmHhdtMw8OmVyl9vQ4C-oqyfQpoqIBVBQLEu08zdAKa0rdCNKbMdD0piq1L7Cq692guZROdB7qyERJciFaoI1xG6THbDyiWaAXkxvqlTmX5KgqDY7OjPvZRIuy-_kKh-Xm0s4MRoBfLuKK30PCig_zt5SX9uNTefzVdtGwcoZENeT0i73dUE9XTTFiGT6ek39nBmWv4AxpG0kHrK5lR7gNAikHxSLSUVkRhbg1MTFhSD38MY8QTX-0nRSAFdkOtln9Usq5VGQJ0eiI88kUJQrqT57q1P05dWGsQ68"
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `${paymentObj.payment_url}?shop_id=${paymentObj.shop_id}&type=1`);
    // xhr.
    xhr.onreadystatechange = handler;
    xhr.responseType = 'blob';
    // xhr.setRequestHeader('Authorization', Authorization);    
    xhr.send();
    function handler() {
      if (this.readyState === this.DONE) {
        if (this.status === 200) {
          // this.response is a Blob, because we set responseType above
          var data_url = URL.createObjectURL(this.response);
          this.data_url = data_url;
          console.log(this.data_url);
          
          // let iframeEle: any = document.querySelector('#iframe')
          // iframeEle.src = data_url;
        } else {
          console.error('error');
        }
      }
    }
  }

  load(e){
    setTimeout(() => {
      let iframeEle: any = document.querySelector('#iframe');
      if(!iframeEle) return false;
      this.height = `${iframeEle.contentWindow.document.body.offsetHeight + 50 < 500 ? iframeEle.contentWindow.document.body.offsetHeight + 50 : 500}px`;
      this.cdr.detectChanges();
      this.spinner.hide();
    },3000);
  }

  // @HostListener('window:message', ['$event']) onMessage(event) {
  //   console.log(event.data);
  //   console.log(window.onmessage);
  //   console.log(window.parent.onmessage);
    
  //   alert(1);
  //   // this.receiveMessage(event);
  // }

}
