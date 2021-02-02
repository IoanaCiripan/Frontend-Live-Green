import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "app/shared/services/user.service";
import { matchingPasswords, patternValidator } from "app/utils/app-validators";
import { ForgotPasswordModel } from "../../../shared/models/forgot-password.model";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css'],
    providers: [UserService]
})
export class ForgotPasswordComponent implements OnInit{

    passwordForm: FormGroup;

    constructor(private fb: FormBuilder,
        private userService: UserService,
        public router: Router){}

    ngOnInit() {
        this.passwordForm = this.fb.group({
            'email': new FormControl('', Validators.required),
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
              'confirmPassword': new FormControl('', Validators.required)
        }, {validator: matchingPasswords('password', 'confirmPassword')})
    }

    resetPassword() {
        let forgotPassword = {
            'email': this.passwordForm.get('email').value,
            'password': this.passwordForm.get('password').value
        } as ForgotPasswordModel;
        this.userService.resetPassword(forgotPassword).subscribe( res => {
            this.router.navigate(['/']);
        }, err => {
            console.log(err.error.message);
        })
    }

    get email() { return this.passwordForm.get('email'); }
    get password() { return this.passwordForm.get('password'); }
    get confirmPassword() { return this.passwordForm.get('confirmPassword'); }

}