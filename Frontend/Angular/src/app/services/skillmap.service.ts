import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skillmap } from '../models/skillmap.model';
import { Joblisting } from '../models/joblisting.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class SkillMapService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Skillmap[]> {
    return this.http.get<Skillmap[]>(`${baseUrl}/skillmaps`);
  }

  get(id: any): Observable<Skillmap> {
    return this.http.get(`${baseUrl}/skillmap/${id}`);
  }

  getByContextAndId(context: any, contextId: any): Observable<Skillmap[]>{
    return this.http.get<Skillmap[]>(`${baseUrl}/skillmaps?context=${context}&contextId=${contextId}`);
  }

  create(data: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(`${baseUrl}/skillmap`, data).subscribe(data => {
        resolve(data);
      });
    })
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/skillmap/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/skillmap/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/skillmaps`);
  }
}