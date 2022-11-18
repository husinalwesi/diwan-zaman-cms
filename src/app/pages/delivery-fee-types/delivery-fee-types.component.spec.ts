import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFeeTypesComponent } from './delivery-fee-types.component';

describe('DeliveryFeeTypesComponent', () => {
  let component: DeliveryFeeTypesComponent;
  let fixture: ComponentFixture<DeliveryFeeTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryFeeTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryFeeTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
