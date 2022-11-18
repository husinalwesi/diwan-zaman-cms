import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelarshipCentreComponent } from './delarship-centre.component';

describe('DelarshipCentreComponent', () => {
  let component: DelarshipCentreComponent;
  let fixture: ComponentFixture<DelarshipCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelarshipCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelarshipCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
