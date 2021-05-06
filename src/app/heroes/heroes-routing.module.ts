import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { HeroesComponent } from './heroes.component';
import { AuthGuard } from '../auth.guard';
import { ConfirmGuard } from '../confirm.guard';
import { HeroResolverService } from './hero/hero-resolver.service';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent,
    children: [
      { path: 'login', loadChildren: () => import('../form/form.module').then(m => m.FormModule) },
      { path: 'rlogin', loadChildren: () => import('../form/form.module').then(m => m.FormModule) },
      { path: ':id',
      component: HeroComponent,
      canActivate: [AuthGuard],
      // canDeactivate: [ConfirmGuard],
      resolve: { hero: HeroResolverService }
    }
  ]},
  { path: '', pathMatch: 'full', redirectTo: '/heroes' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
