import { Component, Input, OnInit } from '@angular/core';
import { ICoin } from 'src/app/models/ICoin';

@Component({
  selector: 'app-wishlist-row',
  templateUrl: './wishlist-row.component.html',
  styleUrls: ['./wishlist-row.component.css']
})
export class WishlistRowComponent implements OnInit {

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
