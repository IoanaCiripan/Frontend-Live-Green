import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login-routing.module';
import { ForgotPasswordDialog } from './forgot-password-dialog/forgot-password-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    ForgotPasswordDialog
  ]
})
export class LoginModule { }
