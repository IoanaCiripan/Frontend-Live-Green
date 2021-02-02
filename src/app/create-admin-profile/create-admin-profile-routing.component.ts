import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAdminProfileComponent } from './create-admin-profile.component';

const routes: Routes = [
  { path: '', component: CreateAdminProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateAdminProfileRoutingModule { }
