import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgAuthService } from "./ng-auth.service";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public ngAuthService: NgAuthService,
    public router: Router
  ){ }
    
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.router.url);
  /*
      if(this.ngAuthService.isLoggedIn) {
        this.router.navigate(['profile']) // when I tried to impliment route guards it caused issues
      }
*/
     if(this.ngAuthService.userAdmin !== true && this.router.url=="/") {
        this.router.navigate(['list-crypto'])
    }

      return true;
  }

}