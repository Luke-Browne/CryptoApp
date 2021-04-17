import { User } from "../ng-auth.service";
import { IUser } from "./IUser";

export interface ICoin {
    id:string,
    symbol:string,
    name:string,
    image:string,
    current_price:string,
    market_cap_rank: Number,
    price_change_percentage_24h: Number,
    sparkline_in_7d: {
        price: []
    }
}

export interface IWatchlist {
    id:string,
    symbol:string,
    userEmail:string
}