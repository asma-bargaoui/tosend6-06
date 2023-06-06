import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/endPoints';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logIn(credentials: any): Observable<any>{
    return this.http.post<any>(endpoint.loginEndpoint, credentials)
  }

  public loggedIn(){
    return !!localStorage.getItem("jwt")
  }
}
