import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsForSaleEditComponent } from './items-for-sale-edit.component';

describe('ItemsForSaleEditComponent', () => {
  let component: ItemsForSaleEditComponent;
  let fixture: ComponentFixture<ItemsForSaleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsForSaleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsForSaleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
