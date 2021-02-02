import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterRoutes } from './register.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
