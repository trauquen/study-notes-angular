import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Hero } from '../shared/hero';
import { HeroService } from './hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
      const hero: (Hero | undefined) = this.heroes.find(h => h.id === id);
      let exitingHero: Hero;
      if (hero){
        exitingHero = {id: hero.id, name: 'Pricezog', team: hero.team};
        this.heroService.editHero(id, exitingHero)
        .subscribe(
          () => {
              console.log(id);
              console.log(this.heroes?.filter(x => x.id === id));
              this.heroes?.filter(x => x.id === id).forEach(x => {console.log(x); x.name = 'Pricezog'; });
          },
          error => console.log(error)
          );
        }
      }
    }

  remove(id: number): void{
    const idx = this.heroes.findIndex(h => h.id === id);
    console.log(idx);
    this.heroService.removeHero(id).subscribe(
      () => {
        // this.heroes = this.heroes?.filter(selected => selected.id !== id);
        if (idx > 0){
          this.heroes = [
            ...this.heroes.slice(0, idx),
            ...this.heroes.slice(idx + 1),
            ];
          this.heroes$ = of(this.heroes);
        }
      },
      error => console.log(error),
      // complete => console.log(complete)
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
