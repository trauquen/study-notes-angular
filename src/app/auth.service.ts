import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, filter, toArray, findIndex, map } from 'rxjs/operators';
import { User } from './shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  auth = (username: string, password: string): Observable<boolean> => {
    return this.httpClient.get<User>('api/users?name=' + username).pipe(
      map(user => {
        // console.log(typeof user, user instanceof Array);
        // console.log(Object.values(user)[0].pswd);
        user = Object.assign(user)[0];
        if (user && user.pswd === password){
          return true;
        }
        return false;
      })

      // map(user => {
      //   const userStr = JSON.parse(JSON.stringify(user));
      //   if (userStr.length > 0 && userStr[0].pswd === password) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // })

    );
  }
}
