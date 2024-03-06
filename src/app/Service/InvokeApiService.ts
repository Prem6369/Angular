import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = `https://localhost:7036/api`;

  constructor(private httpClient: HttpClient) {}

  get(path: string, app: string, params?: any): Observable<any[]> {
    debugger;
    const url = this.getFullAPIUrl(path, app);
    const headers = this.getHeaders();
    const httpParams = this.getParams(params);
    return this.httpClient.get<any>(url, { headers: headers, params: httpParams });
  }

  post(path: string, app: string, body: any) {
    const url = this.getFullAPIUrl(path, app);
    const headers = this.getHeaders();
    return this.httpClient.post<any>(url, body, { headers: headers });
  }

  put(path: string, app: string, body: any) {
    const url = this.getFullAPIUrl(path, app);
    const headers = this.getHeaders();
    return this.httpClient.put<any>(url, body, { headers: headers });
  }

  getFullAPIUrl(path: string, app: string) {
    return `${this.apiUrl}/${app}/${path}`;
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  private getParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return httpParams;
  }

  getToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJjMTQzMGZhZi1jODQ0LTQxYzctYWI0ZC0wMzc3NjVjYjlkMzMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiY2I4ZjQwYzYtZDYwMy00OGQ3LWFiMjYtZTYyYzI1ZGI0NWU0IiwibmJmIjoxNzA5NTI0ODI1LCJleHAiOjE3MDk1ODQ4MjUsImlhdCI6MTcwOTUyNDgyNSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.7oNcd4c30picnukJAUKv6jbXzgCcrYPuCLD3JBS84co';
  }

}
