import {Injectable, OnInit} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { LoginService} from './login.service';
import { AuthenticationService} from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { map, take, tap} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: LoginService, private router: Router, private authService2: AuthenticationService) {

  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | boolean {
    // return this.authenService.isLoggedIn
    //   .pipe(
    //     take(1),
    //     map((isLoggedIn: boolean) => {
    //       if (!isLoggedIn) {
    //         this.router.navigate(['/login']);
    //         return false;
    //       }
    //       return true;
    //     }));


      // console.log('AUTH USER AUTH USER');
      // console.log(this.auth.userUid);
      // console.log('AUTH USER AUTH USER');

    // console.log('IS ADMIN IS ADMIN IS ADMIN');
    // console.log(this.auth.isAdmin());
    // console.log('IS ADMIN IS ADMIN IS ADMIN');

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
  }
}
