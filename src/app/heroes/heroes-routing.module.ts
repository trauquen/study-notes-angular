import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { HeroesComponent } from './heroes.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent, children: [ {path: ':id', component: HeroComponent}] },
  { path: '', pathMatch: 'full', redirectTo: '/heroes' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
