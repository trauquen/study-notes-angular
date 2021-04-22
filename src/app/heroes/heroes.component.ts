import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers:[HeroService]
})
export class HeroesComponent implements OnInit {
  heroes?: Hero[]

  isEnd?: boolean;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroes = this.heroService.getHeroes();
  }

  trackByHeroes(index: number, hero: Hero): string {
      return hero.name;
  }

  getmore = () => {
    this.heroes?.map(h => {this.heroes?.push(h)})
    if(this.heroes && this.heroes.length > 19){
      console.log(this.heroes.length)
      this.isEnd = true;
    }
  }
}
