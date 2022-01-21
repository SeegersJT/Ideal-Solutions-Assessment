import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gender } from '../models/gender.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${baseUrl}/genders`);
  }

  get(id: any): Observable<Gender> {
    return this.http.get(`${baseUrl}/gender/${id}`);
  }
}