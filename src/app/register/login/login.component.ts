import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth.guard';
import { AuthService } from 'app/shared/auth/auth.service';
import { EmailObject } from 'app/shared/models/forgot-password.model';
import { ResponseModel } from 'app/shared/models/response.model';
import { UserModel } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { emailValidator } from '../../utils/app-validators';
import { ForgotPasswordDialog } from './forgot-password-dialog/forgot-password-dialog.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService, AuthGuard]
  })
export class LoginComponent implements OnInit{

    loginForm: FormGroup;

    constructor(
      public formBuilder: FormBuilder, 
      public router:Router,
      public snackBar: MatSnackBar,
      private userService: UserService,
      private authService: AuthService,
      private matDialog: MatDialog
    ){}

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        'email': new FormControl('', Validators.compose([Validators.required, emailValidator])),
        'password': new FormControl('', Validators.required),
      });
    }

    get f() { return this.loginForm.controls; }


    login() {
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;

      let user = {
        'email': email,
        'password': password
      } as UserModel;

      console.log(user);

      this.userService.signIn(user).subscribe( (res: ResponseModel
        ) => {
        console.log(res);
        localStorage.setItem('token', res.token);

        this.snackBar.open('V-ati autentificat cu succes!', '×', 
        { panelClass: 'success', verticalPosition: 'top', duration: 5000 });

        this.authService.login(user);
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(['/home']);


      }, err => {
        console.log(err);
        this.snackBar.open(err.message, '×',
        { panelClass: 'error', verticalPosition: 'top', duration: 5000 })
      })
    }

    navigateToRegister() {
      this.router.navigate(['/register']);
    }

    forgotPassword() {
      let dialogRef = this.matDialog.open(ForgotPasswordDialog, {
        height: 'auto',
        width: 'auto',
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        let email = {
          'email': result
        } as EmailObject;

        if( email != undefined ){
          this.userService.forgotPassword(email).subscribe(res => {
            console.log(res);
          }, err => {
            console.log(err.error.message);
          })
        }
      });
    }

    get email() {
      return this.loginForm.get('email');
    }

    get password() {
      return this.loginForm.get('password');
    }

}