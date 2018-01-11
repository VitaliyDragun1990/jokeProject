import {TestBed, inject} from '@angular/core/testing';

import {AuthService} from './auth.service';

describe('Service: Auth', () => {
  let service: AuthService;

  // default angular stub
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  // our custom definition
  beforeEach(() => {
    service = new AuthService();
  });

  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });

  it('should return true from isAuthenticated when there is a token', () => {
    localStorage.setItem('token', '1234');
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it('should return false from isAuthenticated when there is no token', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

  // default angular stub
  it('should be created', inject([AuthService], (serv: AuthService) => {
    expect(serv).toBeTruthy();
  }));
});
