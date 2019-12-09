import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveItineraryService {

  uri = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  saveItinerary() {
    return this.http.get(this.uri + 'data/save');
  }
}
