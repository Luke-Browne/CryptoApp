import { User } from "../ng-auth.service";
import { IUser } from "./IUser";

export interface ICoin { 
    dbID:string,
    id:string,
    symbol:string,
    name:string,
    image:string,
    current_price:string,
    market_cap_rank: Number,
    price_change_percentage_24h: Number,
    userEmail:string,
    sparkline_in_7d: {
        price: []
    }
}

export interface IWatchlist {
    dbID:string,
    id:string,
    symbol:string,
    userEmail:string
}