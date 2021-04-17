import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowCryptoComponent } from './row-crypto.component';

describe('RowCryptoComponent', () => {
  let component: RowCryptoComponent;
  let fixture: ComponentFixture<RowCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RowCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
