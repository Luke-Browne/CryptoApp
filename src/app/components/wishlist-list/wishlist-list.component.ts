import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/IUser';
import { NgAuthService } from "../../ng-auth.service";
import { FirebaseApiService } from 'src/app/services/firebase-api.service';
import { ICoin, IWatchlist } from 'src/app/models/ICoin';
import { DataService } from 'src/app/services/data.service';
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
  coin: ICoin;

  constructor(public ngAuthService: NgAuthService, private fireBaseApiService: FirebaseApiService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    try{ // gets the user watchlists from the getWatchLists serverless function
      this.dataService.getWatchlistList().subscribe({
        next: (coins: ICoin[]) => this.watchlists = coins,
        complete: () => console.log('watchlist service finished'),
        error: (mess) => this.message = mess
      });
    }
    catch(Error){
      this.router.navigate(['list-crypto']); // I've implimented this catch to deal with the strange issue I have
                                        // after a refresh you have to return to the crypto market and back to the dashboard
      this.router.navigate(['dashboard']);  // to display your watchlists
      alert('Please refresh dashboard to view your watchlist - or add a coin to your watchlist'); 
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
    });
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