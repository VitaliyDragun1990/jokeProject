import { Component, OnInit } from '@angular/core';
import {Routes} from '@angular/router';
import {HomeTestComponent} from '../home-test/home-test.component';

@Component({
  template: `Search`
})
export class SearchTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const testRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeTestComponent},
  {path: 'search', component: SearchTestComponent},
];
