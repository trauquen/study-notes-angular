import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkComponent } from './cdk/cdk.component';
import { ClientsComponent } from './clients/clients.component';
import { CoreComponent } from './core/core.component';

const routes: Routes = [
  { path: '', component: CoreComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'cdk', component: CdkComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialRoutingModule {}
