import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(`${baseUrl}/positions`);
  }

  get(id: any): Observable<Position> {
    return this.http.get(`${baseUrl}/position/${id}`);
  }
}