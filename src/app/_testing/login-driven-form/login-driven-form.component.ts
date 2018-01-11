import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from '../user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login-driven-form',
  template: `
    <form (ngSubmit)="login()"
          [formGroup]="form">
      <label>Email</label>
      <input type="email" formControlName="email">
      <label>Password</label>
      <input type="password" formControlName="password">
      <button type="submit">Login</button>
    </form>`,
})
export class LoginDrivenFormComponent implements OnInit {
  @Output() loggedIn = new EventEmitter<User>();
  form: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[^@]*@[^@]*')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)]]
    });
  }

  login() {
    console.log(`Login ${this.form.value}`);
    if (this.form.valid) {
      this.loggedIn.emit(
        new User(
          this.form.value.email,
          this.form.value.password
        )
      );
    }
  }
}
