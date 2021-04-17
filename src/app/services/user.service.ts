import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCurrentUser(): Observable<IUser> {
    return(JSON.parse(window.localStorage.getItem('user')));
  }
}
