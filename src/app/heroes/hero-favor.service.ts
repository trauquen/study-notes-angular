import { Injectable } from '@angular/core';
import { HeroService } from './hero.service';
import { Hero } from './hero'

@Injectable()
export class HeroFavorService extends HeroService {

  constructor() {
    super();
  }

  getHeroes():Hero[]{
    return super.getHeroes().slice(0,4)
  }
}
