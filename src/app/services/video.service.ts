import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Video} from '../models/video';
import { global} from './global';

@Injectable()
export class VideoService {
  public url: string ;


  constructor(public _http: HttpClient) {
    this.url = global.url;
  }

  create(token, video): Observable<any> {
    const json = JSON.stringify(video);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.post(this.url + 'video/nuevo', params,{ headers : headers });
  }

  getVideos(token, page): Observable<any> {
    if (!page) {
      page = 1;
    }
    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.get(this.url + 'video/listado?page=' + page, { headers : headers });
  }

  getVideo(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.get(this.url + 'video/detalle/' + id, { headers : headers });
  }

  update(token, video, id): Observable<any> {
    const json = JSON.stringify(video);
    const params = 'json=' + json;
    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.put(this.url + 'video/edit/' + id, params,{ headers : headers });
  }

  delete(token, id): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
      .set('Authorization', token);
    return this._http.delete(this.url + 'video/remove/' + id, { headers : headers });
  }

}
