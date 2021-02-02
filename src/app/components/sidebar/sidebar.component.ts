import { Component, OnInit } from '@angular/core';
import { ResponseModel } from 'app/shared/models/response.model';
import { UserModel } from 'app/shared/models/user.model';
import { UserService } from 'app/shared/services/user.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const USER_ROUTES: RouteInfo[] = [
    { path: '/home', title: 'Pagina principala',  icon: 'home', class: '' },
    { path: '/user-profile', title: 'Profil',  icon:'person', class: '' },
    { path: '/earn-points', title: 'Aduna puncte',  icon:'content_paste', class: '' },
    { path: '/get-rewards', title: 'Castiga premii',  icon:'bubble_chart', class: '' },
    { path: '/offers', title: 'Oferte', icon: 'card_giftcard', class: ''},
    { path: '/products', title: 'Produse', icon: 'cached', class: ''}
];
export const ADMIN_ROUTES: RouteInfo[] = [
  { path: '/home', title: 'Pagina principala',  icon: 'home', class: '' },
  { path: '/user-profile', title: 'Profil',  icon:'person', class: '' },
  { path: '/users', title: 'Utilizatori', icon: 'supervisor_account', class: ''},
  { path: '/create-admin-profile', title: 'Cont pentru administrator', icon: 'account_circle', class: '' },
  { path: '/admin-offers', title: 'Oferte', icon: 'card_giftcard', class: ''},
  { path: '/admin-products', title: 'Produse', icon: 'cached', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService]
})
export class SidebarComponent implements OnInit {
  userMenuItems: any[];
  adminMenuItems: any[];
  user: UserModel;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userMenuItems = USER_ROUTES.filter(menuItem => menuItem);
    this.adminMenuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
    this.getUserData();
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  getUserData() {
    this.userService.getUser().subscribe( (res: ResponseModel) => {
      this.user = res.data;
    }, err => {
      console.log(err.error.message);
    })
  }

  isAdmin() {
    return this.user?.role.includes('admin');
  }

  isUser() {
    return this.user?.role.includes('user');
  }
}
