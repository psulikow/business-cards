import { BrowserModule } from '@angular/platform-browser';
import { NgModule , NO_ERRORS_SCHEMA} from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {WebcamModule} from 'ngx-webcam';


import { firebaseConfig } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';

import { LoginService } from './login/login.service';
import { AppRoutingModule } from './app-routing.module';

import {AuthGuard} from './login/auth.guard';
import {DashboardService} from './dashboard/dashboard.service';
import { HistoryService } from './history/history.service';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AlertService} from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import {AlertComponent} from './directives/alert.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { WebCamComponent } from './web-cam/web-cam.component';
import {AdminAuthGuard} from "./login/adminAuth.guard";
import {GoogleAnalyticsEventServiceService} from "./google-analytics-event-service.service";
import {DatabaseService} from "./services/database.service";
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { NgxAnalyticsModule } from 'ngx-analytics';


@NgModule({
  declarations: [
                AppComponent,
                LoginComponent,
                AlertComponent,
                DashboardComponent,
                HeaderComponent,
                HistoryComponent,
                HomeComponent,
                WebCamComponent,
                ],
  imports: [
            BrowserModule,
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireDatabaseModule,
            AngularFireAuthModule,
            FormsModule,
            AppRoutingModule,
            ReactiveFormsModule,
            HttpClientModule,
            MDBBootstrapModule.forRoot(),
            WebcamModule,
            NgxAnalyticsModule.forRoot([NgxAnalyticsGoogleAnalytics]),
            ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
              LoginService,
              AuthGuard,
              AdminAuthGuard,
              AlertService,
              AuthenticationService,
              DashboardService,
              HistoryService,
              GoogleAnalyticsEventServiceService,
              DatabaseService,
              AlertComponent,
              NgxAnalyticsModule
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
