import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './register-layout/register-layout.component';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'home' },
            { path: 'home', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
            { path: 'user-profile', loadChildren: '../user-profile/user-profile.module#UserProfileModule' },
            { path: 'earn-points', loadChildren: '../earn-points/earn-points.module#EarnPointsModule' },
            { path: 'get-rewards', loadChildren: '../get-rewards/get-rewards.module#GetRewardsModule' },
            { path: 'offers', loadChildren: '../offers/offers.module#OffersModule' },
            { path: 'products', loadChildren: '../products/products.module#ProductsModule' },
            { path: 'users', loadChildren: '../users/users.module#UsersModule' },
            { path: 'create-admin-profile', loadChildren: '../create-admin-profile/create-admin-profile.module#CreateAdminProfileModule'},
            { path: 'admin-offers', loadChildren: '../admin-offers/admin-offers.module#AdminOffersModule'},
            { path: 'admin-products', loadChildren: '../admin-products/admin-products.module#AdminProductsModule'}
        ]
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            { path: 'login', loadChildren: '../register/login/login.module#LoginModule' },
            { path: 'register', loadChildren: '../register/register.module#RegisterModule' },
            { path: 'forgot-password', loadChildren: '../register/login/forgot-password/forgot-password.module#ForgotPasswordModule'}
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
