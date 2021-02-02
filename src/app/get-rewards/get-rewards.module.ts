import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { GetRewardsComponent } from './get-rewards.components';
import { GetRewardsRoutingModule } from './get-rewards-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    GetRewardsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [GetRewardsComponent]
})
export class GetRewardsModule { }
