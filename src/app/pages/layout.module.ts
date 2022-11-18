import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import { PagesRoutingModule } from './pages-routing.module';
import { NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslationModule } from '../modules/i18n/translation.module';
import { LayoutComponent } from './_layout/layout.component';
import { ScriptsInitComponent } from './_layout/init/scipts-init/scripts-init.component';
import { HeaderMobileComponent } from './_layout/components/header-mobile/header-mobile.component';
import { AsideComponent } from './_layout/components/aside/aside.component';
import { FooterComponent } from './_layout/components/footer/footer.component';
import { HeaderComponent } from './_layout/components/header/header.component';
import { HeaderMenuComponent } from './_layout/components/header/header-menu/header-menu.component';
import { TopbarComponent } from './_layout/components/topbar/topbar.component';
import { ExtrasModule } from '../_metronic/partials/layout/extras/extras.module';
import { LanguageSelectorComponent } from './_layout/components/topbar/language-selector/language-selector.component';
import { CoreModule } from '../_metronic/core';
import { SubheaderModule } from '../_metronic/partials/layout/subheader/subheader.module';
import { AsideDynamicComponent } from './_layout/components/aside-dynamic/aside-dynamic.component';
import { HeaderMenuDynamicComponent } from './_layout/components/header/header-menu-dynamic/header-menu-dynamic.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2IziToastModule } from "ng2-izitoast";
import { AlertService } from "../_metronic/core/services/alert.service";
import { PaginationBarComponent } from './shared/pagination-bar/pagination-bar.component';
import { NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from "ngx-quill";
// import { LoaderComponent } from './shared/loader/loader.component';
// import { NgxSpinnerModule } from "ngx-spinner";
import { MatCardModule } from '@angular/material/card';
import { AgmCoreModule } from '@agm/core';
import { UploaderComponent } from './shared/uploader/uploader.component';
import { TableEmptyComponent } from './shared/table-empty/table-empty.component';
import { MapComponent } from './shared/map/map.component';
import { AdminsComponent } from './admins/admins.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { RolesAndPermissionsEditComponent } from './roles-and-permissions-edit/roles-and-permissions-edit.component';
import { ItemsForSaleComponent } from './items-for-sale/items-for-sale.component';
import { ItemsForSaleEditComponent } from './items-for-sale-edit/items-for-sale-edit.component';
import { ViewImageDirective } from './shared/directive/view-image.directive';
import { MultiUploaderComponent } from './shared/multi-uploader/multi-uploader.component';
import { ViewFullImageAlbumDirective } from './shared/directive/view-full-image-album.directive';
import { OrdersComponent } from './orders/orders.component';
import { DeliveryFeesComponent } from './delivery-fees/delivery-fees.component';
import { LocalCenterServiceComponent } from './local-center-service/local-center-service.component';
import { BusyStatusComponent } from './busy-status/busy-status.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { RatingComponent } from './rating/rating.component';
import { BrandCrudComponent } from './brand-crud/brand-crud.component';
import { BrandCrudEditComponent } from './brand-crud-edit/brand-crud-edit.component';
import { CarModelsComponent } from './car-models/car-models.component';
import { CarModelsEditComponent } from './car-models-edit/car-models-edit.component';
import { DelarshipCentreComponent } from './delarship-centre/delarship-centre.component';
import { SubscriptionPaymentComponent } from './subscription-payment/subscription-payment.component';
import { RefundRequestsComponent } from './refund-requests/refund-requests.component';
import { AdvertisementRequestsComponent } from './advertisement-requests/advertisement-requests.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DelarshipCentreEditComponent } from './delarship-centre-edit/delarship-centre-edit.component';
import { DeliveryFeesEditComponent } from './delivery-fees-edit/delivery-fees-edit.component';
import { SubscriptionComponent } from './subscriptions/subscription.component';
import { SubscriptionEditComponent } from './subscription-edit/subscription-edit.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { BannerComponent } from './banner/banner.component';
import { BannerCreateComponent } from './banner-create/banner-create.component';
import { CommissionsEditComponent } from './commissions-edit/commissions-edit.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ShopsComponent } from './shops/shops.component';
import { ShopsEditComponent } from './shops-edit/shops-edit.component';
import { RefundsComponent } from './refunds/refunds.component';
import { ReportsComponent } from './reports/reports.component';
import { DeliveryFeesShopComponent } from './delivery-fees-shop/delivery-fees-shop.component';
import { DeliveryFeesShopCreateComponent } from './delivery-fees-shop-create/delivery-fees-shop-create.component';
import { WebsiteContentComponent } from './website-content/website-content.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdvertisementsPlanComponent } from './advertisements-plan/advertisements-plan.component';
import { ServiceCenterComponent } from './service-center/service-center.component';
import { ServiceCenterEditComponent } from './service-center-edit/service-center-edit.component';
import { ServicesComponent } from './services/services.component';
import { ServicesEditComponent } from './services-edit/services-edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TimeSlotComponent } from './time-slot/time-slot.component';
import { TimeSlotCreateComponent } from './time-slot-create/time-slot-create.component';
import { BitwiseComponent } from './bitwise/bitwise.component';
import { DiscountComponent } from './discount/discount.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { ReviewImagesComponent } from './review-images/review-images.component';
import { DeliveryFeeTypesComponent } from './delivery-fee-types/delivery-fee-types.component';
import { DeliveryFeeTypesEditComponent } from './delivery-fee-types-edit/delivery-fee-types-edit.component';
import { RemoveUnderScorePipe } from './shared/pipes/remove-under-score.pipe';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementsCreateComponent } from './announcements-create/announcements-create.component';
import { DatetimeComponent } from './shared/datetime/datetime.component';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-date-and-time-picker';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { RemoveDashsPipe } from './shared/pipes/remove-dashs.pipe';
import { PermissionDirective } from './shared/directive/permission.directive';
import { NgxDateRangeModule } from 'ngx-daterange';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from "src/app/modules/shared/shared.module";
import { UsersComponent } from './users/users.component';
import { UnitsComponent } from './units/units.component';
import { UnitsCreateComponent } from './units-create/units-create.component';
// import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    HeaderMenuDynamicComponent,
    PaginationBarComponent,
    // LoaderComponent,
    UploaderComponent,
    TableEmptyComponent,
    MapComponent,
    AdminsComponent,
    AdminEditComponent,
    CategoryComponent,
    DashboardComponent,
    CategoryEditComponent,
    RolesAndPermissionsComponent,
    RolesAndPermissionsEditComponent,
    ItemsForSaleComponent,
    ItemsForSaleEditComponent,
    ViewImageDirective,
    MultiUploaderComponent,
    ViewFullImageAlbumDirective,
    OrdersComponent,
    DeliveryFeesComponent,
    LocalCenterServiceComponent,
    BusyStatusComponent,
    CommissionsComponent,
    RatingComponent,
    BrandCrudComponent,
    BrandCrudEditComponent,
    CarModelsComponent,
    CarModelsEditComponent,
    DelarshipCentreComponent,
    SubscriptionPaymentComponent,
    RefundRequestsComponent,
    AdvertisementRequestsComponent,
    OrderDetailsComponent,
    DelarshipCentreEditComponent,
    DeliveryFeesEditComponent,
    SubscriptionComponent,
    SubscriptionEditComponent,
    SettlementsComponent,
    BannerComponent,
    BannerCreateComponent,
    CommissionsEditComponent,
    SubCategoryComponent,
    ShopsComponent,
    ShopsEditComponent,
    RefundsComponent,
    ReportsComponent,
    DeliveryFeesShopComponent,
    DeliveryFeesShopCreateComponent,
    WebsiteContentComponent,
    ContactUsComponent,
    AdvertisementsPlanComponent,
    ServiceCenterComponent,
    ServiceCenterEditComponent,
    ServicesComponent,
    ServicesEditComponent,
    ReviewsComponent,
    TimeSlotComponent,
    TimeSlotCreateComponent,
    BitwiseComponent,
    DiscountComponent,
    DiscountEditComponent,
    ReviewImagesComponent,
    SubjectsComponent,
    SubjectEditComponent,
    DeliveryFeeTypesComponent,
    DeliveryFeeTypesEditComponent,
    RemoveUnderScorePipe,
    AnnouncementsComponent,
    AnnouncementsCreateComponent,
    DatetimeComponent,
    RemoveDashsPipe,
    PermissionDirective,
    ProfileComponent,
    UsersComponent,
    UnitsComponent,
    UnitsCreateComponent,
    // NotificationComponent
  ],
  imports: [
    SharedModule,
    AgmCoreModule,
    MatCardModule,
    // NgxSpinnerModule,
    QuillModule,
    CommonModule,
    FormsModule,
    Ng2IziToastModule,
    MatInputModule,
    MatFormFieldModule,
    PagesRoutingModule,
    TranslationModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    SubheaderModule,
    NgbNavModule,
    NgbTooltipModule,
    NgMultiSelectDropDownModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxDateRangeModule,
  ],
  providers: [AlertService, TranslationModule],
  exports: [TranslationModule]
})
export class LayoutModule { }
