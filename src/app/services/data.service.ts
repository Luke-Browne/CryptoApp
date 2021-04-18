import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { ICoin, IWatchlist } from '../models/ICoin';
import { FirebaseApiService } from './firebase-api.service';
import { jsonpFactory } from '@angular/http/src/http_module';
import { waitForAsync } from '@angular/core/testing';
import { IUser } from '../models/IUser';
import { NgAuthService } from '../ng-auth.service';
import { ThrowStmt } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  fullList: ICoin[];
  watchList: IWatchlist[];
  watchlistID: string;
  message:string;
  linkedUser: IUser;
  userEmail:string;
  dbID:string[];

  private apiURL = 'https://api.coingecko.com/api/v3//coins/markets?vs_currency=eur&per_page=50&page=1&sparkline=true';
  private watchlistURL = 'https://api.coingecko.com/api/v3//coins/markets?vs_currency=eur&ids=';
  private filters = '&order=market_cap_rank_desc&per_page=100&page=1&sparkline=true';
  private idString = '';
  private firebaseFunctions = 'https://cors.bridged.cc/https://us-central1-cryptoapp-1ffe9.cloudfunctions.net'

  constructor(private _http:HttpClient, private fireBaseApiService: FirebaseApiService, private dataService: DataService, private ngAuthService: NgAuthService) { }
  
  getCoinList(): Observable<ICoin[]> {

    console.log("get coins called");

    return this._http.get<ICoin[]>(`${this.apiURL}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  getWatchlists(): Observable<IWatchlist[]>{
    return this._http.get<IWatchlist[]>(this.firebaseFunctions + '/getWatchlists')
    .pipe(
      retry(1),
      catchError(this.handleError)
  )}

  getWatchlistList(): Observable<ICoin[]>  {

    let i = 0;

    this.getCoinList();

    this.linkedUser = this.ngAuthService.userState;
    this.userEmail = this.linkedUser.email;
    this.dbID = [];

/*     this.getCoinList().subscribe((res: ICoin[]) => {
      this.fullList = res;
    }); */

    this.getWatchlists().subscribe((res: IWatchlist[]) => {
      this.watchList = res;
    })

    if(this.watchList == undefined){
      this.getWatchlists().subscribe((res: IWatchlist[]) => {
        this.watchList = res;
      })

      console.log('fail');
    }else{
      this.watchList.forEach(watchlist => {
        if(this.userEmail == watchlist.userEmail){
          this.dbID[i] = watchlist.dbID;
          i++;
          this.watchlistID = watchlist.id;
          console.log('dbID: ' + this.watchList)
          this.idString = this.idString + (this.watchlistID + ',');
        }
      }) 

      i = 0;

      if(this.idString != ''){
        return this._http.get<ICoin[]>(`${this.watchlistURL}` + `${this.idString}` + `${this.filters}`)
        .pipe(
          tap(data => data.forEach(element => {
            console.log(this.dbID[i]);
            element.dbID = this.dbID[i]
            i++;
            console.log(element)
          })),
          catchError(this.handleError)
        )
      }
    }

/*       this.fullList.forEach(coin => {
        this.watchList.forEach(watchlist => {
          this.watchlistID = watchlist.id;
        })
      if(coin.id == this.watchlistID){
        console.log('match : ' + this.watchlistID);
        this.idString = this.idString + (this.watchlistID + ',');
      }}); */
  }

  handleError(error :HttpErrorResponse) {
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
