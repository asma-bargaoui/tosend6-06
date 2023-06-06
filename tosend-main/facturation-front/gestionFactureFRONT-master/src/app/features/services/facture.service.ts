import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/endPoints';


@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(private http: HttpClient) { }

  getAllFacture(config: { limit: number; offset: number }): Observable<any[]> {
    return this.http.get<any[]>(endpoint.factureEndpoint + '/user-convention', { params: config });
  }

  updateFacture(id: number):Observable<any>{
    return this.http.put(`${endpoint.factureEndpoint}/${id}/mark-as-paid`, null )
  }

}
