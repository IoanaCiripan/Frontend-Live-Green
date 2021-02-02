import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthGuard } from "app/shared/auth/auth.guard";
import { UserService } from "app/shared/services/user.service";
import { emailValidator } from "app/utils/app-validators";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password-dialog.component.html',
    styleUrls: ['./forgot-password-dialog.component.css'],
    providers: [UserService, AuthGuard]
  })
export class ForgotPasswordDialog implements OnInit{

    emailForm: FormGroup;

    constructor(public dialogRef: MatDialogRef<ForgotPasswordDialog>,
      public formBuilder: FormBuilder){}

    ngOnInit() {
      this.emailForm = this.formBuilder.group({
        'email': new FormControl('', Validators.compose([Validators.required, emailValidator])),
      });
    }

    closeDialog() {
      this.dialogRef.close(this.emailForm.get('email').value);
    }

    get email() {
      return this.emailForm.get('email');
    }

    onNoClick() {
      this.dialogRef.close();
    }
}