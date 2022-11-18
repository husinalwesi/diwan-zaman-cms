import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotCreateComponent } from './time-slot-create.component';

describe('TimeSlotCreateComponent', () => {
  let component: TimeSlotCreateComponent;
  let fixture: ComponentFixture<TimeSlotCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSlotCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSlotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
