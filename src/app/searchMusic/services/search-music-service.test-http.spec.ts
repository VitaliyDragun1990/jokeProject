import {SearchMusicService} from './search-music.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {HttpBackend, HttpClient, JsonpClientBackend} from '@angular/common/http';

describe('Service: SearchMusic ---Test Http request and response ---', () => {

  let service: SearchMusicService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // Use the HttpBackend instead of the JsonpClientBackend
      providers: [SearchMusicService,
        {provide: JsonpClientBackend, useExisting: HttpBackend}
      ]
    });

    // Get the mock http
    httpMock = TestBed.get(HttpTestingController);
    // Get search service we are going to test
    service = TestBed.get(SearchMusicService);
  });

  it('search should return SearchItem',
    () => {
      const reqUrl = 'https://itunes.apple.com/search?term=U2&media=music&limit=20';
      // Prepare mock response
      let response = {
        resultCount: 1,
        results: [
          {
            artistId: '78500',
            artistName: 'U2',
            trackName: 'Beautiful Day',
            artworkUrl30: 'image.jpg'
          }
        ]
      };
      // service.search('U2');
      service.search('U2').then(() => {
        expect(service.results.length).toBe(1);
        expect(service.results[0].artist).toBe('U2');
        expect(service.results[0].name).toBe('Beautiful Day');
        expect(service.results[0].thumbnail).toBe('image.jpg');
        expect(service.results[0].artistId).toBe('78500');
      });
      const req = httpMock.expectOne(request => request.url === reqUrl);

      req.flush(response);
      httpMock.verify();
    });
});
