import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ICoin } from 'src/app/models/ICoin';

@Component({
  selector: 'app-list-crypto',
  templateUrl: './list-crypto.component.html',
  styleUrls: ['./list-crypto.component.css']
})
export class ListCryptoComponent implements OnInit {

  coinList: ICoin[];
  message:string;
  currentCoin: ICoin;
  currentPrice: number;

  constructor(private dataService: DataService) { }

  ngOnInit() : void{

    this.getCoins(); // calls the method when the page loads

  }

  getCoins(){ // populates this.coinList with the data returned from the API
    this.dataService.getCoinList().subscribe({
      next: (coins: ICoin[]) => this.coinList = coins,
      complete: () => console.log('coin service finished'),
      error: (mess) => this.message = mess
    })
  }

  clicked(coin: ICoin): void {
    this.currentCoin = coin; // Sets the clicked coin to this.currentCoin
    document.documentElement.scrollTop = 0; // scrolls to top of page to view details component
  }

  isSelected(coin: ICoin): boolean { 
    if(!coin || !this.currentCoin) {
      return false;
    }else {
      return coin.name == this.currentCoin.name
    }
  }

  
}