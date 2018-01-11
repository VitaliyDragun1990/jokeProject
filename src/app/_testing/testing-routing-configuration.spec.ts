import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HomeTestComponent} from './home-test/home-test.component';
import {SearchTestComponent, testRoutes} from './search-test/search-test.component';
import {AppComponent} from '../app.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';

describe('Router: App', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(testRoutes)],
      declarations: [
        HomeTestComponent,
        SearchTestComponent,
        AppComponent
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('navigate to "" redirects you to /home', (done) => {
    router.navigate(['']).then(() => {
        expect(location.path()).toBe('/home');
        done();
      }
    );
  });

  it('navigate to "search" takes you to /search', (done) => {
    router.navigate(['search']).then(() => {
        expect(location.path()).toBe('/search');
        done();
      }
    );
  });
})
;
