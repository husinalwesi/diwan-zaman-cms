import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandCrudEditComponent } from './brand-crud-edit.component';

describe('BrandCrudEditComponent', () => {
  let component: BrandCrudEditComponent;
  let fixture: ComponentFixture<BrandCrudEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandCrudEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandCrudEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
