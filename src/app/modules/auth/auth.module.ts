import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthComponent } from './auth.component';
import {TranslationModule} from '../i18n/translation.module';
// import { NgxSpinnerModule } from "ngx-spinner";
// import { PaymentComponent } from './payment/payment.component';
// import { LoaderComponent } from '../../pages/shared/loader/loader.component';
// import { AlertService } from "../../_metronic/core/services/alert.service";
import { SharedModule } from "src/app/modules/shared/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent
    // LoaderComponent
    // PaymentComponent,
  ],
  imports: [
    SharedModule,
    // NgxSpinnerModule,
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // providers: [NgxSpinnerModule],
  // exports: [NgxSpinnerModule]
})
export class AuthModule {}
