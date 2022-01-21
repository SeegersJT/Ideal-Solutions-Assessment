import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Applicant } from '../models/applicant.model';
import { Joblisting } from '../models/joblisting.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Applicant[]> {
    return this.http.get<Applicant[]>(`${baseUrl}/applicants`);
  }

  get(id: any): Observable<Applicant> {
    return this.http.get(`${baseUrl}/applicant/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/applicant`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/applicant/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/applicant/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/applicants`);
  }

  findJoblistingByApplicantId(id: any): Observable<Joblisting[]> {
    return this.http.get<Joblisting[]>(`${baseUrl}/joblistings?applicantId=${id}`);
  }
}