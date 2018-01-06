import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchItem} from './search-item';
import {Track} from './artist/track';
import {Album} from './artist/album';

@Injectable()
export class SearchMusicService {
  private apiRoot = 'https://itunes.apple.com';
  results: SearchItem[];
  tracks: Track[];
  albums: Album[];

  constructor(private http: HttpClient) {
  }

  search(term: string): Promise<VoidFunction> {
    return new Promise((resolve, reject) => {
      this.results = [];
      let apiURL = `${this.apiRoot}/search?term=${term}&media=music&limit=20`;
      this.http.jsonp(apiURL, 'callback')
        .toPromise()
        .then(res => {    // Success
            this.results = res['results'].map(item => {
              return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUrl,
                item.artworkUrl30,
                item.artistId
              );
            });
            resolve();
          },
          msg => {  // Error
            reject(msg);
          });
    });
  }

  searchTracks(artistId: string): Promise<VoidFunction> {
    return new Promise<VoidFunction>((resolve, reject) => {
      this.tracks = [];
      let apiURL = `${this.apiRoot}/lookup?id=${artistId}&entity=song`;
      this.http.jsonp(apiURL, 'callback')
        .toPromise()
        .then(res => {    // Success
            this.tracks = res['results'].slice(1).map(item => {
              return new Track(
                item.artworkUrl30,
                item.trackViewUrl,
                item.trackName
              );
            });
            resolve();
          },
          msg => {  // Error
            reject(msg);
          });
    });
  }

  searchAlbums(artistId: string): Promise<VoidFunction> {
    return new Promise<VoidFunction>((resolve, reject) => {
      this.albums = [];
      let apiURL = `${this.apiRoot}/lookup?id=${artistId}&entity=album`;
      this.http.jsonp(apiURL, 'callback')
        .toPromise()
        .then(res => {    // Success
            this.albums = res['results'].slice(1).map(item => {
              return new Album(
                item.artworkUrl60,
                item.collectionViewUrl,
                item.collectionName
              );
            });
            resolve();
          },
          msg => {  // Error
            reject(msg);
          });
    });
  }
}
