import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCenterEditComponent } from './service-center-edit.component';

describe('ServiceCenterEditComponent', () => {
  let component: ServiceCenterEditComponent;
  let fixture: ComponentFixture<ServiceCenterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCenterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCenterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
