import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TorrenterService {

  private scheduleUrl = 'http://localhost:3000/search/';  // URL to web api

  constructor(private http: Http) { }

  getTorrents(torrent : String): Promise<any> {
    return this.http.get(this.scheduleUrl+torrent)
      .toPromise()
      .then(response => {console.log(response.json()); return response.json()})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
