import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../user';

@Component({
  selector: 'app-login-form',
  template: `
  <form>
    <label>Email</label>
    <input type="email" #email>
    <label>Password</label>
    <input type="password" #password>
    <button type="button" (click)="login(email.value, password.value)"
            [disabled]="!enabled">Login</button>
  </form>
  `,
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<User>();
  @Input() enabled = true;

  constructor() { }

  ngOnInit() {
  }

  login(email, password) {
    console.log(`Login ${email} ${password}`);
    if (email && password) {
      console.log(`Emitting`);
      this.loggedIn.emit(new User(email, password));
    }
  }
}
