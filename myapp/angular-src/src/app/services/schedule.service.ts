import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ScheduleService {

  private scheduleUrl = 'http://localhost:3000/new';  // URL to web api
  private topmovieUrl = 'http://localhost:3000/top/movies';
  constructor(private http: Http) { }

  getSchedule(): Promise<any> {
    return this.http.get(this.scheduleUrl)
      .toPromise()
      .then(response => {console.log(response.json()); return response.json()})
      .catch(this.handleError);
  }

  getTopMovies(): Promise<any> {
    return this.http.get(this.topmovieUrl)
      .toPromise()
      .then(response => {console.log(response.json()); return response.json()})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
