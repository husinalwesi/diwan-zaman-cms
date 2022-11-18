import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitwiseComponent } from './bitwise.component';

describe('BitwiseComponent', () => {
  let component: BitwiseComponent;
  let fixture: ComponentFixture<BitwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BitwiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BitwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
