import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFeeTypesEditComponent } from './delivery-fee-types-edit.component';

describe('DeliveryFeeTypesEditComponent', () => {
  let component: DeliveryFeeTypesEditComponent;
  let fixture: ComponentFixture<DeliveryFeeTypesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryFeeTypesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryFeeTypesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
