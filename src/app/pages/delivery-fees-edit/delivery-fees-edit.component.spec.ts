import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryFeesEditComponent } from './delivery-fees-edit.component';

describe('DeliveryFeesEditComponent', () => {
  let component: DeliveryFeesEditComponent;
  let fixture: ComponentFixture<DeliveryFeesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryFeesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryFeesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
