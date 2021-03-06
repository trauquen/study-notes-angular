import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Hero } from '../../shared/hero';
import { HeroDetailService } from '../hero-detail.service';
import { take, mergeMap, catchError, map, tap } from 'rxjs/operators';
import { of, Observable, throwError, defer, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroResolverService implements Resolve<any> {
  constructor(private heroService: HeroDetailService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const id = route.paramMap.get('id') as any;

    return this.heroService.getHero(id).pipe(
      take(1),
      mergeMap((hero) => of(hero)),
      catchError((err) => of(err))
    );
  }
}
