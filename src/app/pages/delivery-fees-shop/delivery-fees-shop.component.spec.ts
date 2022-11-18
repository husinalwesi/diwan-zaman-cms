import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFeesShopComponent } from './delivery-fees-shop.component';

describe('DeliveryFeesShopComponent', () => {
  let component: DeliveryFeesShopComponent;
  let fixture: ComponentFixture<DeliveryFeesShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryFeesShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryFeesShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
