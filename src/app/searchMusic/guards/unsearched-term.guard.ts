import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SearchMusicComponent} from '../search-music/search-music.component';

@Injectable()
export class UnsearchedTermGuard implements CanDeactivate<SearchMusicComponent> {

  canDeactivate(component: SearchMusicComponent, currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> |
    Promise<boolean> | boolean {

    console.log('UnsearchedTermGuard');
    console.log(currentRoute.params);
    console.log(currentState.url);
    return component.canDeactivate() || window.confirm('Are you sure?');
  }
}
