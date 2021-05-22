import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../shared/hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  heroes$?: Observable<Hero[]>;

  isEnd?: boolean;

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
    this.heroes$ = this.heroService.getHeroes();
  }

  trackByHeroes(index: number, hero: Hero): string {
      return hero.name;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
        heroes => this.heroes = heroes
      );
  }

  refreshHeroes = () => {
    this.getHeroes();
  }

  addHero(name: string, team: string): void {
    this.heroService.creatHero(name, team).subscribe(
      hero => this.heroes?.push(hero),
    );
  }

  renameHero(id: number): void{
    if (this.heroes){
      const hero: Hero = this.heroes[id - 1];
      const exitingHero = {id: hero.id, name: 'Pricezog', team: hero.team};
      this.heroService.editHero(id - 1, exitingHero).subscribe(
        next => {
            console.log(id);
            console.log(this.heroes?.filter(x => x.id === id));
            this.heroes?.filter(x => x.id === id).forEach(x => {console.log(x); x.name = 'Pricezog'; });
        },
        error => console.log(error)
        );
      }
    }

  remove(id: number): void{
    this.heroService.removeHero(id).subscribe(
      next => {
        this.heroes = this.heroes?.filter(selected => selected.id !== id);
      },
      error => console.log(error)
    );
  }

  getmore = () => {
    this.heroes?.map(h => this.heroes?.push(h));
    if (this.heroes && this.heroes.length > 9){
      console.log(this.heroes.length);
      this.isEnd = true;
    }
  }
}
