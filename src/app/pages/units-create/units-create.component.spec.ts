import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsCreateComponent } from './units-create.component';

describe('UnitsCreateComponent', () => {
  let component: UnitsCreateComponent;
  let fixture: ComponentFixture<UnitsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
