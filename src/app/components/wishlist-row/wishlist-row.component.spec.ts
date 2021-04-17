import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistRowComponent } from './wishlist-row.component';

describe('WishlistRowComponent', () => {
  let component: WishlistRowComponent;
  let fixture: ComponentFixture<WishlistRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
