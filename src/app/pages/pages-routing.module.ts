import { SubjectEditComponent } from './subject-edit/subject-edit.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { ReviewImagesComponent } from './review-images/review-images.component';
import { TimeSlotCreateComponent } from './time-slot-create/time-slot-create.component';
import { AdvertisementsPlanComponent } from './advertisements-plan/advertisements-plan.component';
import { ShopsEditComponent } from './shops-edit/shops-edit.component';
import { ShopsComponent } from './shops/shops.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { DelarshipCentreComponent } from './delarship-centre/delarship-centre.component';
import { CommissionsEditComponent } from './commissions-edit/commissions-edit.component';
import { SubscriptionEditComponent } from './subscription-edit/subscription-edit.component';
import { SubscriptionComponent } from './subscriptions/subscription.component';
import { DeliveryFeesEditComponent } from './delivery-fees-edit/delivery-fees-edit.component';
import { RatingComponent } from './rating/rating.component';
import { BusyStatusComponent } from './busy-status/busy-status.component';
import { LocalCenterServiceComponent } from './local-center-service/local-center-service.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';
import { AdminsComponent } from './admins/admins.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { RolesAndPermissionsComponent } from './roles-and-permissions/roles-and-permissions.component';
import { RolesAndPermissionsEditComponent } from './roles-and-permissions-edit/roles-and-permissions-edit.component';
import { ItemsForSaleComponent } from './items-for-sale/items-for-sale.component';
import { ItemsForSaleEditComponent } from './items-for-sale-edit/items-for-sale-edit.component';
import { OrdersComponent } from './orders/orders.component';
import { DeliveryFeesComponent } from './delivery-fees/delivery-fees.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { BrandCrudComponent } from './brand-crud/brand-crud.component';
import { BrandCrudEditComponent } from './brand-crud-edit/brand-crud-edit.component';
import { CarModelsComponent } from './car-models/car-models.component';
import { CarModelsEditComponent } from './car-models-edit/car-models-edit.component';
import { SubscriptionPaymentComponent } from './subscription-payment/subscription-payment.component';
import { RefundRequestsComponent } from './refund-requests/refund-requests.component';
import { AdvertisementRequestsComponent } from './advertisement-requests/advertisement-requests.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { DelarshipCentreEditComponent } from './delarship-centre-edit/delarship-centre-edit.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { BannerComponent } from './banner/banner.component';
import { BannerCreateComponent } from './banner-create/banner-create.component';
import { RefundsComponent } from './refunds/refunds.component';
import { ReportsComponent } from './reports/reports.component';
import { DeliveryFeesShopComponent } from './delivery-fees-shop/delivery-fees-shop.component';
import { DeliveryFeesShopCreateComponent } from './delivery-fees-shop-create/delivery-fees-shop-create.component';
import { WebsiteContentComponent } from './website-content/website-content.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServiceCenterEditComponent } from './service-center-edit/service-center-edit.component';
import { ServicesComponent } from './services/services.component';
import { ServicesEditComponent } from './services-edit/services-edit.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { DiscountComponent } from './discount/discount.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';
import { DeliveryFeeTypesComponent } from './delivery-fee-types/delivery-fee-types.component';
import { DeliveryFeeTypesEditComponent } from './delivery-fee-types-edit/delivery-fee-types-edit.component';
import { AnnouncementsCreateComponent } from './announcements-create/announcements-create.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { UnitsComponent } from './units/units.component';
import { UnitsCreateComponent } from './units-create/units-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // 
      { path: 'category', component: CategoryComponent },
      { path: 'category-edit/:id', component: CategoryEditComponent },
      { path: 'category-create', component: CategoryEditComponent },

      { path: 'units', component: UnitsComponent },
      { path: 'units-create', component: UnitsCreateComponent },
      { path: 'unit-edit/:id', component: UnitsCreateComponent },
      // { path: 'category-deleted', component: CategoryComponent },
      // { path: 'category-edit/:id', component: CategoryEditComponent },
      // { path: 'category-view/:id', component: CategoryEditComponent },
      // { path: 'sub-category/:id', component: SubCategoryComponent },
      // 
      // { path: 'admins', component: AdminsComponent },
      // { path: 'admins-deleted', component: AdminsComponent },

      { path: 'admins', component: AdminsComponent },
      { path: 'admins-deleted', component: AdminsComponent },

      { path: 'users', component: AdminsComponent },
      { path: 'users-deleted', component: AdminsComponent },


      { path: 'admin-edit/:id', component: AdminEditComponent },
      { path: 'admin-view/:id', component: AdminEditComponent },
      { path: 'admin-create', component: AdminEditComponent },
      // 
      { path: 'users', component: AdminsComponent },
      { path: 'users-deleted', component: AdminsComponent },
      // 
      { path: 'roles-and-permissions', component: RolesAndPermissionsComponent },
      { path: 'roles-and-permissions-edit/:id', component: RolesAndPermissionsEditComponent },
      { path: 'roles-and-permissions-view/:id', component: RolesAndPermissionsEditComponent },
      { path: 'roles-and-permissions-create', component: RolesAndPermissionsEditComponent },
      // 
      { path: 'items-for-sale', component: ItemsForSaleComponent },
      // { path: 'items-for-sale-pending', component: ItemsForSaleComponent },
      // { path: 'items-for-sale-approved', component: ItemsForSaleComponent },
      // 
      { path: 'announcements', component: AnnouncementsComponent },
      { path: 'announcements-create', component: AnnouncementsCreateComponent },
      // 
      { path: 'items-for-sale-deleted', component: ItemsForSaleComponent },
      { path: 'items-for-sale-edit/:id', component: ItemsForSaleEditComponent },
      { path: 'items-for-sale-view/:id', component: ItemsForSaleEditComponent },
      { path: 'items-for-sale-create', component: ItemsForSaleEditComponent },
      // 
      { path: 'discount', component: DiscountComponent },
      { path: 'discount-deleted', component: DiscountComponent },
      { path: 'discount-edit/:id', component: DiscountEditComponent },
      { path: 'discount-view/:id', component: DiscountEditComponent },
      { path: 'discount-create', component: DiscountEditComponent },
      // 
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/details/:ID', component: OrderDetailsComponent },
      // 
      { path: 'refund-requests', component: RefundRequestsComponent },
      // 
      { path: 'delivery-fees', component: DeliveryFeesComponent },
      { path: 'delivery-fees-deleted', component: DeliveryFeesComponent },
      { path: 'delivery-fees-create', component: DeliveryFeesEditComponent },
      { path: 'delivery-fees-edit/:id', component: DeliveryFeesEditComponent },
      // 
      { path: 'reviews', component: ReviewsComponent },
      { path: 'review-images/:id', component: ReviewImagesComponent },
      { path: 'reviews-deleted', component: ReviewsComponent },
      //
      { path: 'local-center-service', component: LocalCenterServiceComponent },
      { path: 'local-center-service-deleted', component: LocalCenterServiceComponent },
      { path: 'local-center-service-create', component: ServiceCenterEditComponent },
      { path: 'local-center-service-edit/:id', component: ServiceCenterEditComponent },
      { path: 'local-center-service-view/:id', component: ServiceCenterEditComponent },
      // 
      { path: 'services', component: ServicesComponent },
      { path: 'services-deleted', component: ServicesComponent },
      { path: 'services-create', component: ServicesEditComponent },
      { path: 'services-edit/:id', component: ServicesEditComponent },
      //
      { path: 'busy-status', component: BusyStatusComponent },
      // 
      { path: 'commission', component: CommissionsComponent },
      { path: 'commission-deleted', component: CommissionsComponent },
      { path: 'commission-create', component: CommissionsEditComponent },
      { path: 'commission-edit/:id', component: CommissionsEditComponent },
      { path: 'commission-view/id', component: CommissionsEditComponent },
      //
      { path: 'rating', component: RatingComponent },
      //
      { path: 'brand', component: BrandCrudComponent },
      { path: 'brand-deleted', component: BrandCrudComponent },
      { path: 'brand-create', component: BrandCrudEditComponent },
      { path: 'brand-edit/:id', component: BrandCrudEditComponent },
      { path: 'brand-view/id', component: BrandCrudEditComponent },
      //
      { path: 'car-models', component: CarModelsComponent },
      { path: 'car-models-deleted', component: CarModelsComponent },
      { path: 'car-model-create', component: CarModelsEditComponent },
      { path: 'car-model-edit/:id', component: CarModelsEditComponent },
      { path: 'car-model-view/id', component: CarModelsEditComponent },
      //
      { path: 'dealership-centre', component: DelarshipCentreComponent },
      { path: 'dealership-centre-deleted', component: DelarshipCentreComponent },
      { path: 'dealership-centre-create', component: DelarshipCentreEditComponent },
      { path: 'dealership-centre-edit/:id', component: DelarshipCentreEditComponent },
      { path: 'dealership-centre-view/:id', component: DelarshipCentreEditComponent },
      // 
      { path: 'subscription-payment', component: SubscriptionPaymentComponent },
      { path: 'advertisement-requests', component: AdvertisementRequestsComponent },
      { path: 'advertisements-plan', component: AdvertisementsPlanComponent },
      //
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'subscription-deleted', component: SubscriptionComponent },
      { path: 'subscription-create', component: SubscriptionEditComponent },
      { path: 'subscription-edit/:id', component: SubscriptionEditComponent },
      { path: 'subscription-view/id', component: SubscriptionEditComponent },
      // 
      { path: 'settlements', component: SettlementsComponent },
      // 
      { path: 'banner', component: BannerComponent },
      { path: 'banner-deleted', component: BannerComponent },
      { path: 'banner-edit/:id', component: BannerCreateComponent },
      { path: 'banner-view/:id', component: BannerCreateComponent },
      { path: 'banner-create', component: BannerCreateComponent },
      // 
      { path: 'shops', component: ShopsComponent },
      { path: 'shops-deleted', component: ShopsComponent },
      { path: 'shops-edit/:id', component: ShopsEditComponent },
      { path: 'shops-view/:id', component: ShopsEditComponent },
      { path: 'shops-create', component: ShopsEditComponent },
      // 
      { path: 'refunds', component: RefundsComponent },
      // 
      { path: 'reports', component: ReportsComponent },
      // 
      { path: 'delivery-fees-shop', component: DeliveryFeesShopComponent },
      // { path: 'delivery-fees-shop-deleted', component: DeliveryFeesShopComponent },
      { path: 'delivery-fees-shop-edit/:id', component: DeliveryFeesShopCreateComponent },
      // { path: 'delivery-fees-shop-view/:id', component: DeliveryFeesShopCreateComponent },
      { path: 'delivery-fees-shop-create', component: DeliveryFeesShopCreateComponent },
      // 
      { path: 'time-slot-create/:id/:type', component: TimeSlotCreateComponent },
      // 
      { path: 'about-us', component: WebsiteContentComponent },
      { path: 'terms-conditions', component: WebsiteContentComponent },
      { path: 'privacy-policy', component: WebsiteContentComponent },
      // 
      { path: 'contact-us', component: ContactUsComponent },
      //
      { path: 'subjects', component: SubjectsComponent },
      { path: 'subjects-deleted', component: SubjectsComponent },
      { path: 'subjects-create', component: SubjectEditComponent },
      { path: 'subjects-edit/:id', component: SubjectEditComponent },
      { path: 'subject-view/id', component: SubjectEditComponent },
      // 
      { path: 'delivery-fee-types', component: DeliveryFeeTypesComponent },
      { path: 'delivery-fee-types-edit/:id', component: DeliveryFeeTypesEditComponent },
      { path: 'delivery-fee-types-create', component: DeliveryFeeTypesEditComponent },


      { path: 'user-profile', component: ProfileComponent },
      // 

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'errors/404',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }