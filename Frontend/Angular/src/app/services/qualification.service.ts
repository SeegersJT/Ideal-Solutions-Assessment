import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Qualification } from '../models/qualification.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(`${baseUrl}/qualifications`);
  }

  get(id: any): Observable<Qualification> {
    return this.http.get(`${baseUrl}/qualification/${id}`);
  }
}