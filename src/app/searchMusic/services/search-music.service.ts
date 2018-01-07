import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchItem} from '../search-item';
import {Track} from '../domain/track';
import {Album} from '../domain/album';
import {Artist} from '../domain/artist';
import {Video} from '../domain/video';

@Injectable()
export class SearchMusicService {
  private apiRoot = 'https://itunes.apple.com';
  results: SearchItem[] = [];
  tracks: Track[] = [];
  albums: Album[] = [];
  videos: Video[] = [];
  artist: Artist;

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

  searchVideos(artistId: string): Promise<VoidFunction> {
    return new Promise<VoidFunction>((resolve, reject) => {
      this.videos = [];
      let apiURL = `${this.apiRoot}/lookup?id=${artistId}&entity=musicVideo`;
      this.http.jsonp(apiURL, 'callback')
        .toPromise()
        .then(res => {    // Success
            this.videos = res['results'].slice(1).map(item => {
              return new Video(
                item.artworkUrl100,
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

  searchArtist(artistId: string): Promise<VoidFunction> {
    return new Promise<VoidFunction>((resolve, reject) => {
      this.artist = null;
      let apiURL = `${this.apiRoot}/lookup?id=${artistId}`;
      this.http.jsonp(apiURL, 'callback')
        .toPromise()
        .then(res => {    // Success
            let artistItem = res['results'][0];
            this.artist = new Artist(
              artistItem.artistName,
              artistItem.primaryGenreName
            );
            resolve();
          },
          msg => {  // Error
            reject(msg);
          });
    });
  }
}
