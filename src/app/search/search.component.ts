import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {SearchItem} from '../search-item';
import {Observable} from 'rxjs/Observable';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // loading = false;
  loadingF = false;
  results: Observable<SearchItem[]>;
  searchField: FormControl;

  constructor(private _itunes: SearchService) {
  }

  get itunes() {
    return this._itunes;
  }

  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges
      .do(() => this.loadingF = true)
      .pipe(
        filter(term => term.length > 1),
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(term => this._itunes.searchFor(term)) // from Observable<string> to <Observable<SearchItem>
      ).do(() => this.loadingF = false);    // no need to subscribe because we use async pipe on template
  }

  // doSearch(term: string) {
  //   this.loading = true;
  //   this._itunes.search(term).then(() => this.loading = false);
  // }

  doSearchFor(term: string) {
   this.results = this.itunes.searchFor(term);
  }

}
