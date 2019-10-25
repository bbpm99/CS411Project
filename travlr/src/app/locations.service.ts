import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getLocation(location) {
    return this.http.get(this.uri + '/yelp/' + location);
  }
}
