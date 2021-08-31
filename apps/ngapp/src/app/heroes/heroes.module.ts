import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroComponent } from './hero/hero.component';
import { HeroesComponent } from './heroes.component';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollDirective } from '../infinite-scroll.directive';
import { FavoriteHeroesComponent } from './favorite-heroes/favorite-heroes.component';
import { SortPipe } from '../shared/sort.pipe';

@NgModule({
  declarations: [
    HeroComponent,
    HeroesComponent,
    InfiniteScrollDirective,
    SortPipe,
    FavoriteHeroesComponent,
  ],
  imports: [CommonModule, MatCardModule, HeroesRoutingModule],
  exports: [
    // HeroesComponent,
    HeroComponent,
  ],
})
export class HeroesModule {}
