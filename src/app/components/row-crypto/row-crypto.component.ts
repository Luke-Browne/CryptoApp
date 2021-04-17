import { Component, OnInit, Input } from '@angular/core';
import { ICoin } from '../../models/ICoin';

@Component({
  selector: 'app-row-crypto',
  templateUrl: './row-crypto.component.html',
  styleUrls: ['./row-crypto.component.css']
})
export class RowCryptoComponent implements OnInit {

  @Input() coin: ICoin;

  test:number;
  numberString: string;
  symbolString:string;
  priceString:string;
  pcString:string;

  constructor() { }

  ngOnInit(): void {
    this.pcString = this.coin.price_change_percentage_24h.toString();
    this.numberString = parseFloat(this.pcString).toFixed(2);
    this.test = +this.numberString;
    this.symbolString = this.coin.symbol.toUpperCase();
    this.priceString = '€' + parseFloat(this.coin.current_price.toString()).toFixed(2);
  }
}
