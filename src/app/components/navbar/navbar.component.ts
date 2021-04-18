import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NgAuthService } from 'src/app/ng-auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {

  title = 'angular-firebase-authentication';

  items: Observable<any[]>;

  public isCollapsed = true;
  
  constructor(private _data: DataService, public ngAuthService: NgAuthService, public db:AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }
}
