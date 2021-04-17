import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCryptoComponent } from './details-crypto.component';

describe('DetailsCryptoComponent', () => {
  let component: DetailsCryptoComponent;
  let fixture: ComponentFixture<DetailsCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
