import {LoginComponent} from './login.component';
import {AuthService} from '../auth.service';

class MockAuthService {
  authenticated = false;

  isAuthenticated() {
    return this.authenticated;
  }

  isAuthenticatedAsync() {
    return Promise.resolve(true);
  }
}

describe('Component: Login ---Creating fake mock service class---', () => {

  let component: LoginComponent;
  let service: MockAuthService;

  beforeEach(() => {
    service = new MockAuthService();
    component = new LoginComponent(service);
  });

  afterEach(() => {
    service = null;
    component = null;
  });

  it('needsLogin return true when the user is not authenticated', () => {
    service.authenticated = false;
    expect(component.needsLogin()).toBeTruthy();
  });

  it('needsLogin returns false when the user is authenticated', () => {
    service.authenticated = true;
    expect(component.needsLogin()).toBeFalsy();
  });
});
