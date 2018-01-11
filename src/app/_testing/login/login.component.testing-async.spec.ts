import {LoginComponent} from './login.component';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AuthService} from '../auth.service';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('Component: Login ---Testing asynchronous call---', () => {

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
    el = fixture.debugElement.query(By.css('.async'));
  });

  it('Button label via jasmine.done', (done) => {
    // start up 'detect change' process
    fixture.detectChanges();
    // after starting change detection cycle the text should be 'Login'
    // because by default we are not authenticated
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    // change the authentication state to true
    let spy = spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
    // call ngOnInit - must be done by us, in test environment angular don't do it himself
    // this call create pending promise
    component.ngOnInit();
    // we must attach callback to spi so we know when the promise is resolved and we can make assertion
    spy.calls.mostRecent().returnValue.then(() => {
      // trigger change detection process
      fixture.detectChanges();
      // now the text is 'Logout'
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
      done();
    });
  });

  it('Button label via async() and whenStable()', async(() => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
    // whenStable resolves only after all pending promises have been resolved inside async() body
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });
    // this call create pending async activity (promise in this case)
    component.ngOnInit();
  }));

  it('Button label via fakeAsync() and tick()', fakeAsync(() => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(authService, 'isAuthenticatedAsync').and.returnValue(Promise.resolve(true));
    // this call create pending async activity
    component.ngOnInit();

    // we call tick() for completing pending async activities - resolving promises or observables
    tick();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  }));
});
