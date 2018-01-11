import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  template: `<a>
    <span *ngIf="needsLogin()">Login</span>
    <span *ngIf="!needsLogin()">Logout</span>
  </a>
  <a class="async">
    <span *ngIf="needsLoginAsync">Login</span>
    <span *ngIf="!needsLoginAsync">Logout</span>
  </a>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  needsLoginAsync = true;

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.auth.isAuthenticatedAsync().then((authenticated) => {
      this.needsLoginAsync = !authenticated;
    });
  }

  needsLogin() {
    return !this.auth.isAuthenticated();
  }

}
