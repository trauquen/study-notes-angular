import { Injectable } from '@angular/core';
import { HeroService } from './hero.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Hero } from './hero';

@Injectable()
export class HeroFavorService extends HeroService {

  constructor(http: HttpClient) {
     super(http);
  }

  getHeroes(): Observable<Hero[]>{
    return super.getHeroes().pipe(
      map(heroes => heroes.slice(0, 5))
    );
  }
}
