import { Injectable, Input } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero'

@Injectable()
export class HeroDetailService {
  private hero?:Hero

  constructor(private heroService: HeroService) { }

  getHero(id:number): Hero | undefined{
    const heroes = this.heroService.getHeroes();
    this.hero = heroes.find(hero => hero.id === id);
    return this.hero
  }
}
