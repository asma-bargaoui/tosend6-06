import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/endPoints';

@Injectable({
  providedIn: 'root'
})
export class ConventionService {
  
  [x: string]: any;
 
  constructor(private http: HttpClient) { }

 
  createConvention(convention: any): Observable<any> {
    return this.http.post<any>(`${endpoint.conventionEndpoint}/create`, convention);
  }

  updateConvention(conventionId: number, convention: any): Observable<any> {
    return this.http.put<any>(`${endpoint.conventionEndpoint}/${conventionId}`, convention);
  }

  deleteConvention(conventionId: number): Observable<any> {
    return this.http.delete<any>(`${endpoint.conventionEndpoint}/${conventionId}`);
  }

  getConventionsByUser(): Observable<any[]> {
    return this.http.get<any[]>(`${endpoint.conventionEndpoint}/user-convention`);
  }

  getApplication(): Observable<any[]> {
    return this.http.get<any[]>(`${endpoint.conventionEndpoint}/applications`);
  }

  getAllStructures(): Observable<any[]> {
    return this.http.get<any[]>(`${endpoint.conventionEndpoint}/structures`);
  }
}