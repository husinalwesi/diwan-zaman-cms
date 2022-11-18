import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesAndPermissionsEditComponent } from './roles-and-permissions-edit.component';

describe('RolesAndPermissionsEditComponent', () => {
  let component: RolesAndPermissionsEditComponent;
  let fixture: ComponentFixture<RolesAndPermissionsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesAndPermissionsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesAndPermissionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
