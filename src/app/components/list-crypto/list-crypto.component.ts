import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { ICoin } from 'src/app/models/ICoin';
import { delay } from 'rxjs/operators';

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

    getCoins();

  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
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

export function getCoins(){
  this.dataService.getCoinList().subscribe({
    next: (coins: ICoin[]) => this.coinList = coins,
    complete: () => console.log('coin service finished'),
    error: (mess) => this.message = mess
  })
}