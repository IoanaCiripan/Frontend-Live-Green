import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EarnPointsComponent } from './earn-points.component';
import { EarnPointsRoutingModule } from './earn-points-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  imports: [
    CommonModule,
    EarnPointsRoutingModule,
    SharedModule,
    ZXingScannerModule,
  ],
  declarations: [EarnPointsComponent]
})
export class EarnPointsModule { }
