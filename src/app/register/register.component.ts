import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserModel } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { emailValidator, matchingPasswords, patternValidator } from '../utils/app-validators';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: [UserService]
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    public router:Router, 
    public snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'name': new FormControl('', [Validators.compose([Validators.required, Validators.minLength(3)])]),
      'email': new FormControl('', Validators.compose([Validators.required, emailValidator])),
      'zipCode': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([
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
      'confirmPassword': new FormControl('', Validators.required),
      'terms': new FormControl('', [(control) => {    
        return !control.value ? { 'required': true } : null;
      }])
    },
    {validator: matchingPasswords('password', 'confirmPassword')}
    );
  }

  register() {
    let name = this.registerForm.get('name').value;
    let email = this.registerForm.get('email').value;
    let zipCode = this.registerForm.get('zipCode').value;
    let password = this.registerForm.get('password').value;
    let confirmPassword = this.registerForm.get('confirmPassword').value;

    let splittedName = name.split(' ');

    let user = {
      'firstName': splittedName[0],
      'lastName': splittedName[1],
      'email': email,
      'zipCode': zipCode,
      'password': password,
      'confirmPassword': confirmPassword
    } as UserModel;

    console.log(user);

    this.userService.register(user).subscribe( res => {
      console.log(res);
      this.snackBar.open('V-ati inregistrat cu succes! Veti fi trimis spre autentificare!', '×', 
        { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
      this.navigateToLogin();
    }, err => {
      console.log(err);
      this.snackBar.open(err.error.message, '×',
        { panelClass: 'error', verticalPosition: 'top', duration: 5000 })
    })
  }

  navigateToLogin() {
      this.router.navigate(['/login']);
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get zipCode() { return this.registerForm.get('zipCode'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get terms() { return this.registerForm.get('terms'); }
}