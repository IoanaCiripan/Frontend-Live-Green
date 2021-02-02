import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EmailObject, ForgotPasswordModel } from '../models/forgot-password.model';
import { ResetPasswordModel, UpdatePasswordModel } from '../models/reset-password.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class UserService {

    constructor(public http: HttpClient){}

    public url = environment.webApi + '/users';

    register(user: UserModel) {
        return this.http.post(this.url + '/signup', user);
    }

    signIn(user: UserModel) {
        return this.http.post(this.url + '/login', user);
    }

    getUser() {
        return this.http.get(this.url + '/user-data');
    }

    getAllUsers() {
        return this.http.get(this.url);
    }

    updateData(user: UserModel) {
        return this.http.patch(this.url + '/updateMyData', user);
    }

    deleteAccount() {
        return this.http.delete(this.url + '/deleteAccount');
    }

    forgotPassword(emailObject: EmailObject) {
        return this.http.post(this.url + '/forgotPassword', emailObject);
    }

    updatePassword(resetPassword: UpdatePasswordModel) {
        return this.http.patch(this.url + '/updatePassword', resetPassword);
    }

    resetPassword(forgotPassword: ForgotPasswordModel) {
        return this.http.patch(this.url + '/resetPassword', forgotPassword);
    }

}