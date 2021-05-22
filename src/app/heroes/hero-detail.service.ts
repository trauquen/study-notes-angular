import { Injectable, Input } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from '../shared/hero';
import { Observable } from 'rxjs';
import { filter, take, map, find, tap } from 'rxjs/operators';

// @Injectable()
// export class HeroDetailService {
//   private hero?: Hero;

//   constructor(private heroService: HeroService) { }

//   getHero(id: number): Observable<Hero[]>{
//     return this.heroService.getHeroes().pipe(
//       map(heroes => heroes.filter(hero => hero.id === id))
//     );
//   }
// }

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroDetailService {
  constructor(private httpClient: HttpClient) { }

  getHero(id: number): Observable<Hero>{
    return this.httpClient.get<Hero>('api/heroes/' + id);
  }
}
