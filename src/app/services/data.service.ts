import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { ICoin, IWatchlist } from '../models/ICoin';
import { FirebaseApiService } from './firebase-api.service';
import { IUser } from '../models/IUser';
import { NgAuthService } from '../ng-auth.service';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  fullList: ICoin[];
  watchList: any = [];
  watchlistID: string;
  message:string;
  linkedUser: IUser;
  userEmail:string;
  dbID: string[];

  private apiURL = 'https://api.coingecko.com/api/v3//coins/markets?vs_currency=eur&per_page=50&page=1&sparkline=true';
  private watchlistURL = 'https://api.coingecko.com/api/v3//coins/markets?vs_currency=eur&ids=';
  private filters = '&order=market_cap_rank_desc&per_page=100&page=1&sparkline=true';
  private idString = '';
  private firebaseFunctions = 'https://cors.bridged.cc/https://us-central1-cryptoapp-1ffe9.cloudfunctions.net';
  private fullURL = '';

  constructor(private _http:HttpClient, private fireBaseApiService: FirebaseApiService, private dataService: DataService, private ngAuthService: NgAuthService) { }
  
  getCoinList(): Observable<ICoin[]> {
    // returns all coins
    console.log("get coins called");

    return this._http.get<ICoin[]>(`${this.apiURL}`)
    .pipe(
      catchError(this.handleError)
    )
  }

  
  // function to return all watchlists
  getWatchlistList(): Observable<ICoin[]> {

    let i = 0;

    this.linkedUser = this.ngAuthService.userState;
    this.userEmail = this.linkedUser.email;
    this.dbID = [];
    this.watchlistID = '';

    this.fireBaseApiService.getWatchlists().subscribe((data: {}) => {
      this.watchList = data;
    });

    console.log(this.watchList);

    this.watchList.forEach(element => {
      if(element.userEmail == this.linkedUser.email) {

        this.dbID[i] = element.dbID;
        console.log(element.dbID);
        i++;
        this.idString = this.idString + (element.id + ',');

      }
    });

    i = 0;
    this.fullURL = this.watchlistURL + this.idString + this.filters;
    console.log(this.fullURL);

    return this._http.get<ICoin[]>(`${this.watchlistURL}` + `${this.idString}` + `${this.filters}`)
    .pipe(
      tap(data => data.forEach(element => {
        console.log(JSON.stringify(this.dbID));
        console.log(this.dbID[i]);
        element.dbID = this.dbID[i];
        i++;
      })),
      catchError(this.handleError)
    )

  }

  /* getWatchlistList(): Observable<ICoin[]> {

    let i = 0;

    this.linkedUser = this.ngAuthService.userState;
    this.userEmail = this.linkedUser.email;
    this.dbID = [];
    this.watchList = [];
    this.watchlistID = '';

    this.getWatchlists().subscribe({
      next: (data: IWatchlist[]) => this.watchList = data,
      complete: () => console.log('watchlist service finished'),
      error: (mess) => this.message = mess
    })
    console.log('watchlist :' + JSON.stringify(this.watchList));
    this.idString = '';

      // each api call is made up of three parts - the api url, the coins to be retrieved, and the search filters
      // loops through each watchlist and adds the id of a coin to the api call where the email matches the logged in user email

      this.watchList.forEach(watchlist => {
        if(this.userEmail == watchlist.userEmail){ // matches a watchlist based on email
          this.dbID[i] = watchlist.dbID; // populates this.dbID array using the returned firebase key
          console.log('adding ' + watchlist.dbID); // logs it
          i++; // adds 1 to i for each watchlist coin where there is an email match
          this.watchlistID = watchlist.id; // example of watchlistID is bitcoin, which is passed into the api call
          console.log('ID: ' + JSON.stringify(this.watchlistID));
          this.idString = this.idString + (this.watchlistID + ','); // for each match, the name of the coin is added to this string
          console.log(this.idString);
          console.log(this.dbID);
        }
      });

      i = 0; // to start from the beginning of dbID array
    this.fullURL = this.watchlistURL + this.idString + this.filters;
    console.log(this.fullURL);

    return this._http.get<ICoin[]>(`${this.watchlistURL}` + `${this.idString}` + `${this.filters}`)
    .pipe( // calls the api using this.idString - line 65
      tap(data => data.forEach(element => { // loops through each coin
        console.log(JSON.stringify(this.dbID)); // logs the dbIDs from earlier
        console.log(this.dbID[i]); // if i = 0, it will log the first dbID - this is where I'm having confusion
        element.dbID = this.dbID[i]; // sets the IWatchlist property (dbID) = line 76
        i++; // logs the element which should now have the dbID populated
      })),
      catchError(this.handleError)
    );
  }
 */
  /* getWatchlistList(): Observable<ICoin[]>  {
    let i = 0;

    this.linkedUser = this.ngAuthService.userState;
    this.userEmail = this.linkedUser.email;
    this.dbID = [];
    this.watchList = [];
    this.watchlistID = '';

    this.getWatchlists().subscribe({
      next: (data: IWatchlist[]) => this.watchList = data,
      complete: () => console.log('watchlist service finished'),
      error: (mess) => this.message = mess
    });

    this.getWatchlists().subscribe((res: IWatchlist[]) => {
      this.watchList = res;
      console.log('watchlist :' + JSON.stringify(this.watchList));
      this.idString = '';

      // each api call is made up of three parts - the api url, the coins to be retrieved, and the search filters
      // loops through each watchlist and adds the id of a coin to the api call where the email matches the logged in user email

      this.watchList.forEach(watchlist => {
        if(this.userEmail == watchlist.userEmail){ // matches a watchlist based on email
          this.dbID[i] = watchlist.dbID; // populates this.dbID array using the returned firebase key
          console.log('adding ' + watchlist.dbID); // logs it
          i++; // adds 1 to i for each watchlist coin where there is an email match
          this.watchlistID = watchlist.id; // example of watchlistID is bitcoin, which is passed into the api call
          console.log('ID: ' + JSON.stringify(this.watchlistID));
          this.idString = this.idString + (this.watchlistID + ','); // for each match, the name of the coin is added to this string
          console.log(this.idString);
          console.log(this.dbID);
        }
      })
    });

    i = 0; // to start from the beginning of dbID array
    this.fullURL = this.watchlistURL + this.idString + this.filters;
    console.log(this.fullURL);

    return this._http.get<ICoin[]>(`${this.watchlistURL}` + `${this.idString}` + `${this.filters}`)
    .pipe( // calls the api using this.idString - line 65
      tap(data => data.forEach(element => { // loops through each coin
        console.log(JSON.stringify(this.dbID)); // logs the dbIDs from earlier
        console.log(this.dbID[i]); // if i = 0, it will log the first dbID - this is where I'm having confusion
        element.dbID = this.dbID[i]; // sets the IWatchlist property (dbID) = line 76
        i++; // logs the element which should now have the dbID populated
      })),
      catchError(this.handleError)
    )
  } */

/*   getWatchlists(): Observable<IWatchlist[]>{
    return this._http.get<IWatchlist[]>(this.fireBaseApiService.getWatchlists())
    .pipe(
      tap(data => console.log(data)),
      retry(1),
      catchError(this.handleError)
    )
  } */

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
