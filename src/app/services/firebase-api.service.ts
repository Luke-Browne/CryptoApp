import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IWatchlist } from '../models/ICoin';

const apiURL = 'https://cors.bridged.cc/https://us-central1-cryptoapp-1ffe9.cloudfunctions.net';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {


  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content Type' : 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  addToWatchlist(id:string, symbol:string, userEmail:string): Observable<IWatchlist> {
    return this.http.post<IWatchlist>(apiURL + '/addToWatchlist?id=' + id + '&symbol=' + symbol + '&userEmail=' + userEmail, null)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteFromWatchlist(dbID:string) : Observable<IWatchlist> {

    console.log('dbID = ' + dbID);

    return this.http.delete<IWatchlist>(apiURL + '/deleteFromWatchlist?dbID=' + dbID)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error : HttpErrorResponse) {
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
