import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HeroFavorService } from '../hero-favor.service';

@Component({
  selector: 'app-favorite-heroes',
  templateUrl: './favorite-heroes.component.html',
  styleUrls: ['./favorite-heroes.component.scss'],
  providers: [{provide: HeroService, useClass: HeroFavorService}]
})
export class FavoriteHeroesComponent implements OnInit {
  heroes?: Hero[];
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
     this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes,
     );
  }
}
