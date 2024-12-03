import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminGuard] },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
