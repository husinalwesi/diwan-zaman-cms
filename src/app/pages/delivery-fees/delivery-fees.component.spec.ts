import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFeesComponent } from './delivery-fees.component';

describe('DeliveryFeesComponent', () => {
  let component: DeliveryFeesComponent;
  let fixture: ComponentFixture<DeliveryFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
