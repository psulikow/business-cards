import { Component, OnInit, Input } from '@angular/core';
import { LoginService} from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  constructor(private loginService: LoginService) {

  }
  @Input() public title: string;
  @Input() public isUserLoggedIn: boolean;

  logout() {
    this.loginService.signOut();
  }
}
