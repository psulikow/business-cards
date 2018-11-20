import {Injectable, OnInit} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginService} from './login.service';
import { AuthenticationService} from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { map, take, tap} from 'rxjs/operators';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router, private authService2: AuthenticationService) {

  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.userUid === 'B6syy4hU0cg3ZAzY8OG3k7U5LQi1') {
      return this.authService.user.pipe(
        take(1),
        map((user) => !!user),
        tap((loggedIn) => {
          if (!loggedIn) {
            console.log('access denied');
            this.router.navigate(['']);
            return loggedIn;
          }
        }),
      );
    } else {
      window.alert("You must have admin rights to view this page.");
      return false;
    }
  }
}
