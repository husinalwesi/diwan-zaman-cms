import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementsPlanComponent } from './advertisements-plan.component';

describe('AdvertisementsPlanComponent', () => {
  let component: AdvertisementsPlanComponent;
  let fixture: ComponentFixture<AdvertisementsPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementsPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementsPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
