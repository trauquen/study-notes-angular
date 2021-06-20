import { Injectable, Input } from '@angular/core';
import { Hero } from '../shared/hero';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroDetailService {
  constructor(private httpClient: HttpClient) { }

  getHero(id: number): Observable<any>{
    return this.httpClient.get<Hero>('api/heroes/' + id)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: any): any {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.body.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
