import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsEditComponent } from './commissions-edit.component';

describe('CommissionsEditComponent', () => {
  let component: CommissionsEditComponent;
  let fixture: ComponentFixture<CommissionsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
