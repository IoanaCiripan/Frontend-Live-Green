import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseModel } from 'app/shared/models/response.model';
import { UserModel } from 'app/shared/models/user.model';
import { UserService } from 'app/shared/services/user.service';
import { matchingPasswords, patternValidator } from 'app/utils/app-validators';
import { AuthService } from '../shared/auth/auth.service';
import { UpdatePasswordModel } from '../shared/models/reset-password.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {

  managedUser: UserModel;
  updateUserForm = new FormGroup({
    email: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    zipCode: new FormControl('')
  });

  passwordForm: FormGroup;

  constructor(
    private userService: UserService,
    public fb: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getUserData();

    this.passwordForm = this.fb.group({
      oldPassword: new FormControl(''),
      newPassword: new FormControl('', Validators.compose([
        //Pass is required
        Validators.required,
        //Check if pass has a number
        patternValidator(/\d/, { hasNumber: true }),
        //Check if pass has an uppercase letter
        patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        //Check if pass has a lowercase letter
        patternValidator(/[a-z]/, { hasSmallCase: true }),
        //Check if pass has at least 6 characters
        Validators.minLength(6)
      ])),
      confirmNewPassword: new FormControl('')
    }, {validator: matchingPasswords('newPassword', 'confirmNewPassword')});
  }

  getUserData() {
    this.userService.getUser().subscribe( (res: ResponseModel) => {
      this.managedUser = res.data;
      this.initializeForm(this.managedUser);
    }, err => {
      this.snackBar.open(err.error.message, '×', 
        { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    })
  }

  initializeForm(user: UserModel) {
    this.updateUserForm = new FormGroup({
      email: new FormControl(user.email),
      firstName: new FormControl(user.firstName),
      lastName: new FormControl(user.lastName),
      zipCode: new FormControl(user.zipCode)
    });
  }

  updateData() {
    let firstName = this.updateUserForm.get('firstName').value;
    let lastName = this.updateUserForm.get('lastName').value;
    let email = this.updateUserForm.get('email').value;
    let zipCode = this.updateUserForm.get('zipCode').value;

    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(zipCode);

    let user = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'zipCode': zipCode
    } as UserModel;

    this.userService.updateData(user).subscribe( res => {
      this.snackBar.open('Your data has been updated!', '×', 
        { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
    }, err => {
      this.snackBar.open(err.error.message, '×', 
        { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    })

  }

  deleteAccount() {
    this.userService.deleteAccount().subscribe( res => {
      this.authService.logout();
    }, err => {
      this.snackBar.open(err.error.message, '×', 
        { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    })
  }

  updatePassword() {
    let resetPassword = {
      'oldPassword': this.passwordForm.get('oldPassword').value,
      'newPassword': this.passwordForm.get('newPassword').value
    } as UpdatePasswordModel;

    this.userService.updatePassword(resetPassword).subscribe( res => {
      console.log(res);
      this.snackBar.open('Your password has been updated!', '×', 
        { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
    }, err => {
      this.snackBar.open(err.error.message, '×', 
        { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    })
  }

  isUser() {
    return this.managedUser?.role.includes('user');
  }

  get oldPassword() { return this.passwordForm.get('oldPassword'); }
  get newPassword() { return this.passwordForm.get('newPassword'); }
  get confirmNewPassword() { return this.passwordForm.get('confirmNewPassword'); }

}
