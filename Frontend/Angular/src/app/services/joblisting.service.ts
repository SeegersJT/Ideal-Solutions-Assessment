import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Joblisting } from '../models/joblisting.model';
import { Applicant } from '../models/applicant.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class JoblistingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Joblisting[]> {
    return this.http.get<Joblisting[]>(`${baseUrl}/joblistings`);
  }

  get(id: any): Observable<Joblisting> {
    return this.http.get(`${baseUrl}/joblisting/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/joblisting`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/joblisting/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/joblisting/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/joblistings`);
  }

  findApplicantsByJoblistingId(id: any): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(`${baseUrl}/applicants?joblistingId=${id}`);
  }
}