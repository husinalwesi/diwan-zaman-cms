import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarModelsEditComponent } from './car-models-edit.component';

describe('CarModelsEditComponent', () => {
  let component: CarModelsEditComponent;
  let fixture: ComponentFixture<CarModelsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarModelsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarModelsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
