import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUploaderComponent } from './multi-uploader.component';

describe('MultiUploaderComponent', () => {
  let component: MultiUploaderComponent;
  let fixture: ComponentFixture<MultiUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
