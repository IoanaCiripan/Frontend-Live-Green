import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOffersComponent } from './admin-offers.component';

const routes: Routes = [
  { path: '', component: AdminOffersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOffersRoutingModule { }
