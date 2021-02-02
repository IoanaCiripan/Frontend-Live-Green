import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
// For MDB Angular Free
import { CarouselModule, WavesModule } from 'angular-bootstrap-md'
import { SharedModule } from 'app/shared/shared.module';
import { AdminOffersComponent } from './admin-offers.component';
import { AdminOffersRoutingModule } from './admin-offers-routing.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddOfferDialog } from './add-offer/add-offer.component';

@NgModule({
  imports: [
    CommonModule,
    AdminOffersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    SharedModule,
    MatPaginatorModule,
    MatSortModule,
    // UploadImageComponent,
    CarouselModule.forRoot(),
    WavesModule.forRoot()
  ],
  declarations: [AdminOffersComponent, AddOfferDialog]
})
export class AdminOffersModule { }
