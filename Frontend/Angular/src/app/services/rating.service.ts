import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rating } from '../models/rating.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${baseUrl}/ratings`);
  }

  get(id: any): Observable<Rating> {
    return this.http.get(`${baseUrl}/rating/${id}`);
  }
}