import {Component, OnInit} from '@angular/core';
import {SearchMusicService} from '../services/search-music.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-search-music',
  templateUrl: './search-music.component.html',
  styleUrls: ['./search-music.component.css']
})
export class SearchMusicComponent implements OnInit {
  loading = false;

  constructor(private _itunes: SearchMusicService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(params => {
      if (params['term']) {
        this.doSearch(params['term']);
      }
    });
  }

  get itunes() {
    return this._itunes;
  }

  ngOnInit() {
  }

  doSearch(term: string) {
    this.loading = true;
    this._itunes.search(term).then(() => this.loading = false);
  }

  onSearch(term: string) {
    // define optional parameter 'term'
    this.router.navigate(['search', {term: term}]);
  }

  canDeactivate() {
    return this._itunes.results.length > 0;
  }

}
