import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCryptoComponent } from './list-crypto.component';

describe('ListCryptoComponent', () => {
  let component: ListCryptoComponent;
  let fixture: ComponentFixture<ListCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
