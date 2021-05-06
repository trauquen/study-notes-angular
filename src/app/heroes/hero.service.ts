import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
// @Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes/';
  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl, {
      headers: new HttpHeaders({Authorization: 'myAuthToken'})
      });
  }

  creatHero(name: string, team: string): Observable<Hero> {
    const hero = {name, team};
    return this.http.post<Hero>(this.heroesUrl, hero);
  }

  editHero(id: number, hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl + id, hero);
  }

  removeHero(id: number): Observable<any>{
    return this.http.delete(this.heroesUrl + id);
  }
}
