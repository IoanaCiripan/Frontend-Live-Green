import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAdminProfileComponent } from './create-admin-profile.component';
import { CreateAdminProfileRoutingModule } from './create-admin-profile-routing.component';

@NgModule({
  imports: [
    CommonModule,
    CreateAdminProfileRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [CreateAdminProfileComponent]
})
export class CreateAdminProfileModule { }
