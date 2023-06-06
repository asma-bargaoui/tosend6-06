import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/endPoints';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  saveNewUser(user: any): Observable<any> {
    return this.http.post<any>(`${endpoint.registerEndPoint}`, user);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${endpoint.userEndpoint}/get`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${endpoint.userEndpoint}/delete/${id}`);
  }
  

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${endpoint.userEndpoint}/update/${user.id}`, user);
  }

  searchUser(user: any): Observable<any> {
    return this.http.put<any>(`${endpoint.userEndpoint}/users/search/${user.username}`, user);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${endpoint.userEndpoint}/get`);
  }

  getConnectedAdmins(): Observable<any> {
    return this.http.get<any>(`${endpoint.userEndpoint}/admins`);
  }

  getConnectedUsers(): Observable<any> {
    return this.http.get<any>(`${endpoint.userEndpoint}/users`);
  }
}
