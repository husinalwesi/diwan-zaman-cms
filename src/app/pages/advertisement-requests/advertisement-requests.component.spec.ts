import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisementRequestsComponent } from './advertisement-requests.component';

describe('AdvertisementRequestsComponent', () => {
  let component: AdvertisementRequestsComponent;
  let fixture: ComponentFixture<AdvertisementRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisementRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisementRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
