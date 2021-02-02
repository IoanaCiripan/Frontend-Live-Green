import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutRoutingModule} from './layout-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './register-layout/register-layout.component';
import { ComponentsModule } from 'app/components/components.module';
import { AuthGuard } from 'app/shared/auth/auth.guard';
import { AuthService } from 'app/shared/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FlexLayoutModule,
    ComponentsModule
  ],
  exports: [],
  declarations: [
    AdminLayoutComponent,
    LoginLayoutComponent,
  ], providers: [AuthGuard, AuthService]
})
export class LayoutModule { }
