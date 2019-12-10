import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetSavedPlansService {

  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPlans() {
    return this.http.get(this.uri + '/data/read', { withCredentials: true });
  }
}
