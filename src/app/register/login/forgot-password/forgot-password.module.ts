import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutes } from './forgot-password-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ForgotPasswordRoutes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ForgotPasswordComponent
  ]
})
export class ForgotPasswordModule { }
