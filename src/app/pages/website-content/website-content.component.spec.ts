import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteContentComponent } from './website-content.component';

describe('WebsitContentComponent', () => {
  let component: WebsiteContentComponent;
  let fixture: ComponentFixture<WebsiteContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
