import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserModel } from "app/shared/models/user.model";
import { UserService } from "app/shared/services/user.service";
import {
  emailValidator,
  matchingPasswords,
  patternValidator,
} from "app/utils/app-validators";

@Component({
  selector: "app-admin-profile",
  templateUrl: "./create-admin-profile.component.html",
  styleUrls: ["./create-admin-profile.component.css"],
  providers: [UserService],
})
export class CreateAdminProfileComponent implements OnInit {
  createUserForm: FormGroup;

  constructor(
    private userService: UserService,
    public fb: FormBuilder,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createUserForm = this.fb.group(
      {
        firstName: new FormControl("", [
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ]),
        lastName: new FormControl("", [
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ]),
        email: new FormControl(
          "",
          Validators.compose([Validators.required, emailValidator])
        ),
        zipCode: new FormControl("", Validators.required),
        password: new FormControl(
          "",
          Validators.compose([
            //Pass is required
            Validators.required,
            //Check if pass has a number
            patternValidator(/\d/, { hasNumber: true }),
            //Check if pass has an uppercase letter
            patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            //Check if pass has a lowercase letter
            patternValidator(/[a-z]/, { hasSmallCase: true }),
            //Check if pass has at least 6 characters
            Validators.minLength(6),
          ])
        ),
        confirmPassword: new FormControl("", Validators.required),
        terms: new FormControl("", [
          (control) => {
            return !control.value ? { required: true } : null;
          },
        ]),
      },
      { validator: matchingPasswords("password", "confirmPassword") }
    );
  }

  onSubmit() {
    let firstName = this.createUserForm.get("firstName").value;
    let lastName = this.createUserForm.get("lastName").value;
    let email = this.createUserForm.get("email").value;
    let zipCode = this.createUserForm.get("zipCode").value;
    let password = this.createUserForm.get("password").value;
    let confirmPassword = this.createUserForm.get("confirmPassword").value;

    let user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      zipCode: zipCode,
      role: "admin",
      password: password,
      confirmPassword: confirmPassword,
    } as UserModel;

    console.log(user);

    this.userService.register(user).subscribe(
      (res) => {
        console.log(res);
        this.snackBar.open("Ati creat contul cu success!", "×", {
          panelClass: "success",
          verticalPosition: "top",
          duration: 5000,
        });
      },
      (err) => {
        console.log(err);
        this.snackBar.open(err.error.message, "×", {
          panelClass: "error",
          verticalPosition: "top",
          duration: 5000,
        });
      }
    );
  }

  onReset(): void {
    this.createUserForm.reset();
  }

  get firstName() { return this.createUserForm.get('name'); }
  get lastName() { return this.createUserForm.get('name'); }
  get email() { return this.createUserForm.get('email'); }
  get zipCode() { return this.createUserForm.get('zipCode'); }
  get password() { return this.createUserForm.get('password'); }
  get confirmPassword() { return this.createUserForm.get('confirmPassword'); }
}
