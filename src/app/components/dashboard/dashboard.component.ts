import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { DataService } from 'src/app/services/data.service';
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { NgAuthService } from "../../ng-auth.service";
import { WishlistListComponent } from '../wishlist-list/wishlist-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  linkedUser: IUser;
  userEmail:string;

  constructor(public ngAuthService: NgAuthService, private dataService: DataService) { }

  ngOnInit(): void {
    this.linkedUser = this.ngAuthService.userState;
    this.userEmail = this.linkedUser.email;
  }

}
