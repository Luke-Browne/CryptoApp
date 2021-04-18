import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { User } from 'src/app/ng-auth.service';
import { UserService } from '../../services/user.service';
import { NgAuthService } from "../../ng-auth.service";
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { ICoin, IWatchlist } from 'src/app/models/ICoin';
import { DataService } from 'src/app/services/data.service';
import { NgForOf } from '@angular/common';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css']
})
export class WishlistListComponent implements OnInit {

  linkedUser: IUser;
  userEmail:string;
  watchlists: IWatchlist[];
  coinList: ICoin[];
  message:string;
  currentCoin: ICoin;
  currentPrice: number;
  coin: IWatchlist[];

  constructor(public ngAuthService: NgAuthService, private fireBaseApiService: FirebaseApiService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.linkedUser = this.ngAuthService.userState;
    this.userEmail = this.linkedUser.email;

    try{
      this.dataService.getWatchlistList().subscribe({
        next: coin => this.watchlists = coin,
        complete: () => console.log('WATCHLIST : ' + JSON.stringify(this.watchlists)), 
        error: (mess) => this.message = mess
      });
    }
    catch(Error){
      this.getCoins();
      this.dataService.getWatchlistList().subscribe({
        next: coin => this.watchlists = coin,
        complete: () => console.log('WATCHLIST : ' + JSON.stringify(this.watchlists)), 
        error: (mess) => this.message = mess
      });
/*      alert(Error.message);
      this.router.navigate(['list-crypto']);

      this.router.navigate(['dashboard']);
      alert('Please refresh dashboard to view your watchlist');  */
    }
  }

  /*   loadWishlists() {
    return this.dataService.getWatchlists().subscribe((data: {}) => {
      this.wishlists = data;
    })
  } */

  getCoins(){
    this.dataService.getCoinList().subscribe({
      next: (coins: ICoin[]) => this.coinList = coins,
      complete: () => console.log('coin service finished'),
      error: (mess) => this.message = mess
    })
  }

  clicked(coin: ICoin): void {
    this.currentCoin = coin;
    document.documentElement.scrollTop = 0;
  }

  isSelected(coin: ICoin): boolean {
    if(!coin || !this.currentCoin) {
      return false;
    }else {
      return coin.name == this.currentCoin.name
    }
  }
}

