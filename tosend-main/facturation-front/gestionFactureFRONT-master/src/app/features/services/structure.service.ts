import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/endPoints';

@Injectable({
  providedIn: 'root'
})
export class StructureService {

  constructor(private http: HttpClient) { }

  getAllStructureWithoutMinistere():Observable<any[]>{
    return this.http.get<any[]>(endpoint.structureEndpoint+"/without-ministere");
  }

  getStructureAll():Observable<any[]>{
    return this.http.get<any[]>(endpoint.structureEndpoint+"/all");
  }

  createStructure(structure: any):Observable<any>{
    return this.http.post<any>(`${endpoint.structureEndpoint}/create`, structure)
  }

  updateStructure(structureId: number, structure: any): Observable<any>{
    return this.http.put<any>(`${endpoint.structureEndpoint}/${structureId}`, structure)
  }

  deleteStructure(structureId: number): Observable<any>{
    return this.http.delete<any>(`${endpoint.structureEndpoint}/delete-child/${structureId}`)
  }
}