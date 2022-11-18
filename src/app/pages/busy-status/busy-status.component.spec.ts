import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyStatusComponent } from './busy-status.component';

describe('BusyStatusComponent', () => {
  let component: BusyStatusComponent;
  let fixture: ComponentFixture<BusyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
