import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCenterServiceComponent } from './local-center-service.component';

describe('LocalCenterServiceComponent', () => {
  let component: LocalCenterServiceComponent;
  let fixture: ComponentFixture<LocalCenterServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalCenterServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalCenterServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
