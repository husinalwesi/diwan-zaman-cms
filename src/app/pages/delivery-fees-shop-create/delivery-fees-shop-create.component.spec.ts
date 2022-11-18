import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFeesShopCreateComponent } from './delivery-fees-shop-create.component';

describe('DeliveryFeesShopCreateComponent', () => {
  let component: DeliveryFeesShopCreateComponent;
  let fixture: ComponentFixture<DeliveryFeesShopCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryFeesShopCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryFeesShopCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
