import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HistoryComponent } from './history/history.component';
import { AuthGuard } from './login/auth.guard';
import { AdminAuthGuard } from "./login/adminAuth.guard";
import {HomeComponent} from './home/home.component';
import {WebCamComponent} from './web-cam/web-cam.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, data: { regular: true, }, canActivate: [AuthGuard]},
  { path: 'history', component: HistoryComponent, data: { admin: true} ,canActivate: [AdminAuthGuard]},
  { path: 'home', component: HomeComponent, data: { regular: true, } ,canActivate: [AuthGuard]},
  { path: 'camera', component: WebCamComponent, data: { regular: true, }, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class AppRoutingModule { }
