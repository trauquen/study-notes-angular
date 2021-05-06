import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Hero } from '../hero';
import { HeroDetailService } from '../hero-detail.service';
import { take, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroResolverService implements Resolve<Hero> {

  constructor(private heroService: HeroDetailService) { }

  resolve(route: ActivatedRouteSnapshot, state:
    RouterStateSnapshot): Observable<Hero> {
      const id = route.paramMap.get('id') as any;
      return this.heroService.getHero(id).pipe(
        take(1),
        mergeMap(hero => of(hero))
      );
    }
}
