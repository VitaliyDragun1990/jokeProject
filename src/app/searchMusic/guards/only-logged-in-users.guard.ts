import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserAuthService} from '../services/user-auth.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('OnlyLoggedInUsers');
    if (this.userAuthService.isLoggedIn()) {
      return true;
    } else {
      window.alert('You don\'t have permission to view this page');
      return false;
    }
  }
}
