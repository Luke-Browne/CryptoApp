import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { NgAuthService } from "./ng-auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angular-firebase-authentication';

  items: Observable<any[]>;
  
  constructor(private _data: DataService, public ngAuthService: NgAuthService, public db:AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }
}