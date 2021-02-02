import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserModel } from '../models/user.model';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  get isLoggedIn() {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    if (this.jwtHelper.isTokenExpired(token)) {
      return false;
    } 
    return true;
  }

  login(user: UserModel) {
    if (user.email !== '' && user.password !== '' ) {
      console.log(localStorage);
    }
  }

  logout() {
    localStorage.setItem("user", '');
    localStorage.setItem('token', '');
    this.router.navigate(['/login']);
  }
}