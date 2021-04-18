import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { ICoin, IWatchlist } from 'src/app/models/ICoin';
import { IUser } from 'src/app/models/IUser';
import { NgAuthService, User } from 'src/app/ng-auth.service';
import { FirebaseApiService } from '../../services/firebase-api.service';

@Component({
  selector: 'app-details-crypto',
  templateUrl: './details-crypto.component.html',
  styleUrls: ['./details-crypto.component.css']
})
export class DetailsCryptoComponent implements OnInit {

  @Input() coin: ICoin
  @Input() wishList: IWatchlist

  watchLists: any = [];

  symbolValue = '';
  nameValue = '';
  rankValue = '';
  priceValue = '';
  imageValue = '';

  priceString:string;
  symbolString:string;
  linkedUser: IUser;
  userEmail:string;
  firebaseID:string;

  constructor(private fireBaseApiService: FirebaseApiService, private ngAuthService: NgAuthService, public router: Router) { }

  ngOnInit(): void {
    this.priceString = '€' + this.coin.current_price;
    this.symbolString = this.coin.symbol.toUpperCase();
  }

  addToWishlist() {

    if(this.ngAuthService.userState != undefined){

      this.linkedUser = this.ngAuthService.userState;
      this.userEmail = this.linkedUser.email;

      return this.fireBaseApiService.addToWatchlist(this.coin.id, this.coin.symbol, this.userEmail.toString()).subscribe((data: {}) => {
        this.watchLists = data;
        console.log('add activated by ' + this.userEmail + ' data : ' + this.watchLists);
      })
    }else{
      console.log('user not logged in!');
    }
  }

  removeFromWatchlist(){

    this.linkedUser = this.ngAuthService.userState;
    this.userEmail = this.linkedUser.email;

    console.log(this.coin.dbID);
    console.log(this.userEmail);

    return this.fireBaseApiService.deleteFromWatchlist(this.coin.dbID.toString()).subscribe((data: {}) => {
      this.watchLists = data;
      console.log('delete activated by ' + this.userEmail + 'coin name : ' + this.coin.name + 'dbID : ' + this.coin.dbID);
    })
  }

  
  handleError(error : HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);

      // question over how much information you want to give to the end-user
      // it depends on who will be using the system
      // this information would not be returned in a public interface but might in an intranet.

      if (error.status == 412) {
        return throwError('412 Error' + JSON.stringify(error.error))
      }
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}

export function deleteFromWatchlist(){

  this.linkedUser = this.ngAuthService.userState;
  this.userEmail = this.linkedUser.email;

  console.log(this.coin.dbID);
  console.log(this.userEmail);

  return this.fireBaseApiService.deleteFromWatchlist(this.coin.dbID.toString()).subscribe((data: {}) => {
    this.watchLists = data;
    console.log('delete activated by ' + this.userEmail + 'coin name : ' + this.coin.name + 'dbID : ' + this.coin.dbID);
    window.location.reload();
  })
}