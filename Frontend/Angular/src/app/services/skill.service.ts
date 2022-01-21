import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(`${baseUrl}/skills`);
  }

  get(id: any): Observable<Skill> {
    return this.http.get(`${baseUrl}/skill/${id}`);
  }
}