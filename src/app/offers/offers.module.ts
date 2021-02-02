import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OffersComponent } from './offers.component';
import { OffersRoutingModule } from './offers-routing.module';

@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [OffersComponent]
})
export class OffersModule { }
