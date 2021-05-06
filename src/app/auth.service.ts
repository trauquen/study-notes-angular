import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, toArray, findIndex, map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  auth = (username: string, password: string): Observable<boolean> => {
    return this.httpClient.get<User>('api/users?name=' + username).pipe(
      map(user => {
        const userStr = JSON.parse(JSON.stringify(user));
        if (userStr.length > 0 && userStr[0].pswd === password) {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
