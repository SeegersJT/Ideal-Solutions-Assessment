import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Location[]> {
    return this.http.get<Location[]>(`${baseUrl}/locations`);
  }

  get(id: any): Observable<Location> {
    return this.http.get(`${baseUrl}/location/${id}`);
  }
}