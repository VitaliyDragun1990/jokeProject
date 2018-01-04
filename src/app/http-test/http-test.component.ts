import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-http-test',
  templateUrl: './http-test.component.html',
  styleUrls: ['./http-test.component.css']
})
export class HttpTestComponent implements OnInit {
  apiRoot = 'http://httpbin.org';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  doGET() {
    console.log('GET');
    let url = `${this.apiRoot}/get`;
    let search = new HttpParams();
    search.set('foo', 'moo');
    search.set('limit', '25');
    this.http.get(url, {params: search}).subscribe(res => console.log(res));
  }

  doPOST() {
    console.log('POST');
    let url = `${this.apiRoot}/post`;
    let params = new HttpParams();
    params.set('foo', 'moo');
    params.set('limit', '25');
    this.http.post(url, {moo: 'foo', goo: 'loo'}, {params}).subscribe(res => console.log(res));
  }

  doPUT() {
    console.log('PUT');
    let url = `${this.apiRoot}/put`;
    let params = new HttpParams();
    params.set('foo', 'moo');
    params.set('limit', '25');
    this.http.put(url, {moo: 'foo', goo: 'loo'}, {params}).subscribe(res => console.log(res));
  }

  doDELETE() {
    console.log('DELETE');
    let url = `${this.apiRoot}/delete`;
    let params = new HttpParams();
    params.set('foo', 'moo');
    params.set('limit', '25');
    this.http.delete(url, {params}).subscribe(res => console.log(res));
  }

  doGETAsPromise() {
    console.log('GET AS PROMISE');
    let url = `${this.apiRoot}/get`;
    this.http.get(url)
      .toPromise()
      .then(res => console.log(res));
  }

  doGETAsPromiseError() {
    console.log('GET A PROMISE ERROR');
    let url = `${this.apiRoot}/post`;
    this.http.get(url)
      .toPromise()
      .then(res => console.log(res),
        msg => console.error(`Error: ${msg.status} ${msg.statusText}`));
  }

  doGETAsObservableError() {
    console.log('GET AS OBSERVABLE ERROR');
    let url = `${this.apiRoot}/post`;
    this.http.get(url).subscribe(
      res => console.log(res),
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    );
  }

  doGETWithHeaders() {
    console.log('GET WITH HEADERS');
    let headers = new HttpHeaders();
    headers.append('Authorization', btoa('username:password'));
    headers.append('super-custom', 'hello');
    let url = `${this.apiRoot}/get`;
    this.http.get(url, {headers: headers}).subscribe(
      res => console.log(res),
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)
    );
  }
}
