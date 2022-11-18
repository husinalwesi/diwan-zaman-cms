import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelarshipCentreEditComponent } from './delarship-centre-edit.component';

describe('DelarshipCentreEditComponent', () => {
  let component: DelarshipCentreEditComponent;
  let fixture: ComponentFixture<DelarshipCentreEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelarshipCentreEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelarshipCentreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
