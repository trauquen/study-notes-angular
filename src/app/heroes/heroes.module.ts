import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { HeroesComponent } from './heroes.component';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollDirective } from '../infinite-scroll.directive';
import { FavoriteHeroesComponent } from './favorite-heroes/favorite-heroes.component';
import { HeroService } from './hero.service'

@NgModule({
  declarations: [
    HeroComponent,
    HeroesComponent,
    InfiniteScrollDirective,
    FavoriteHeroesComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    HeroesComponent,
    HeroComponent
  ],
  providers:[HeroService]
})
export class HeroesModule { }
