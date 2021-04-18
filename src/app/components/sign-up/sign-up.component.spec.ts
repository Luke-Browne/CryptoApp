import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgAuthService } from 'src/app/ng-auth.service';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow a user to enter mismatched passwords',  () => {
    const email = "default@user.ie";
    const password1 = "password1";
    const password2 = "password2";

    let ngAuthService : NgAuthService;

    const result = ngAuthService.SignUp(email, password1, password2);
    expect(result).toBe(0);
  });
});
