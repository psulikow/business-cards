import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService} from '../services/authentication.service';
import { AlertService} from '../services/alert.service';
import {GoogleAnalyticsEventServiceService} from "../google-analytics-event-service.service";

declare const gtag: Function;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private loginService: LoginService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, public googleAnalyticsEventsServiceService: GoogleAnalyticsEventServiceService ) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          console.log("inside subscribe");
            gtag('set', 'page', event.urlAfterRedirects);
            gtag('send', 'pageview');
        }
      });
  }

  submitEvent() {
    console.log("submitting GA event");
    this.googleAnalyticsEventsServiceService.emitEvent("testCategory", "testAction", "testLabel", 10);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }
  emailLogin() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    console.log(this.f.username.value);

    this.loginService.loginWithEmail(this.f.username.value, this.f.password.value)
        .then(() => this.router.navigate(['/home']))
        .catch( error => {
          this.alertService.error(error);
          this.loading = false;
          console.log(error);
          this.router.navigate(['/login']);
        });
  }
}
