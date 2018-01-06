import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchItem} from './search-item';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Injectable()
export class SearchService {
  apiRoot = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  constructor(private http: HttpClient) {
    this.results = [];
    this.loading = false;
  }

  // search implementation using Promises
  // search(term: string) {
  //   const promise = new Promise((resolve, reject) => {
  //     const apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
  //     this.http.get(apiURL)
  //       .toPromise()
  //       .then(res => {    // Success
  //           this.results = res['results'].map(item => {
  //             return new SearchItem(
  //               item.trackName,
  //               item.artistName,
  //               item.trackViewUrl,
  //               item.artworkUrl30,
  //               item.artistId
  //             );
  //           });
  //           resolve();
  //         },
  //         msg => {    // Error
  //           reject(msg);
  //         });
  //   });
  //   return promise;
  // }

  // search implementation using Observable
  searchFor(term: string): Observable<SearchItem[]> {
    let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=200&callback=JSONP_CALLBACK`;
    return this.http.jsonp(apiURL, 'JSONP_CALLBACK')
      .pipe(
        map(res => res['results'].map(item => {
          return new SearchItem(
            item.trackName,
            item.artistName,
            item.trackViewUrl,
            item.artworkUrl30,
            item.artistId
          );
        }))
      );
  }
}
