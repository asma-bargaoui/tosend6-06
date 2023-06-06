import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/endPoints';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  getAllRole() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<any>{
    return this.http.get<any[]>(`${endpoint.roleEndPoint}/getall`);
  }
}
