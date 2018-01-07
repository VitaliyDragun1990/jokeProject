import {Injectable} from '@angular/core';

@Injectable()
export class UserAuthService {

  constructor() {
  }

  isLoggedIn(): boolean {
    return true;
  }

}
