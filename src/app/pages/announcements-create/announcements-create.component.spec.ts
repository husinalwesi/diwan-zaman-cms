import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsCreateComponent } from './announcements-create.component';

describe('AnnouncementsCreateComponent', () => {
  let component: AnnouncementsCreateComponent;
  let fixture: ComponentFixture<AnnouncementsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
