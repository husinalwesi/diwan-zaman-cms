import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderComponent } from '../../pages/shared/loader/loader.component';


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule
  ],
  exports: [LoaderComponent,NgxSpinnerModule]
})
export class SharedModule { }
