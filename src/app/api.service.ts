import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.backendUrl; // Use the apiUrl from environment

  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<any> {
    return this.http.get(`${this.baseUrl}organizations/`);
  }

  updateOrganization(id: string, updateOrganizationDto: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}organizations/${id}`,
      updateOrganizationDto
    );
  }
}
