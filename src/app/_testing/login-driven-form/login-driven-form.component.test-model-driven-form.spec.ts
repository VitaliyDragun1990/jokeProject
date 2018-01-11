import {LoginDrivenFormComponent} from './login-driven-form.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {User} from '../user';

describe('Component: LoginDrivenForm --- Test Model Driven Forms---', () => {
  let component: LoginDrivenFormComponent;
  let fixture: ComponentFixture<LoginDrivenFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [LoginDrivenFormComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginDrivenFormComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    // manually trigger this lifecycle hook to create our form model in component instance
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field invalid when empty', () => {
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();
  });

  it('email field required validator failing when field empty', () => {
    let errors = {};
    let email = component.form.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('email field pattern validator failing when input text doesn\'t contain @', () => {
    let errors = {};
    let email = component.form.controls['email'];
    email.setValue('test');
    errors = email.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.form.controls['password'];

    // Password field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
    console.log(errors);

    // Set password to something
    password.setValue('1234');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set password to something correct
    password.setValue('123456789');
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('123456789');
    expect(component.form.valid).toBeTruthy();

    let user: User;
    // Subscribe to the Observable and store the user ina local variable.
    component.loggedIn.subscribe(value => user = value);
    // Trigger the login function
    component.login();

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe('test@test.com');
    expect(user.password).toBe('123456789');
  });
});
