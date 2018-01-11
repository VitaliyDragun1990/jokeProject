import {LoginComponent} from './login.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService} from '../auth.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('Component: Login ---Testing change detection---', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  // DebugElement is a wrapper to the low level DOM element that represents the component's view
  let el: DebugElement;

  beforeEach(() => {
    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(LoginComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    // AuthService provided by the TestBed
    authService = TestBed.get(AuthService);
    // get the 'a' element by CSS selector (e.g., be class name)
    el = fixture.debugElement.query(By.css('a'));
  });

  it('login button hidden when the user is authenticated', () => {
    // no change detection has been triggered - view doesn't show either Login or Logout text
    expect(el.nativeElement.textContent.trim()).toBe('');
    // start up 'detect change' process
    fixture.detectChanges();
    // after starting change detection cycle the text should be 'Login'
    // because by default we are not authenticated
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    // change the authentication state to true
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    // the text is still 'Login'. We need change detection to run and for Angular to update the template
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    // trigger change detection process
    fixture.detectChanges();
    // now the text is 'Logout'
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  });
});
