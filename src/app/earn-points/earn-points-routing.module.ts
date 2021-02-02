import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EarnPointsComponent } from './earn-points.component';

const routes: Routes = [
  { path: '', component: EarnPointsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EarnPointsRoutingModule { }
