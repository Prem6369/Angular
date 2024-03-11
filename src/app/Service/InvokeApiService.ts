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

  getHeaders() {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.getToken()
    );
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

  getFullAPIUrl(path: string, app: string) {
    return `${this.apiUrl}/${app}/${path}`;
  }


  private getToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI5ZGE2NmNjYy1hMTdkLTQyZjctOTkxYy1hN2VmYWM4ODJjMmIiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMjY2ZmFjNDQtM2NkYi00MzBiLTkzZGYtMDJlZTg4NjQwMGZhIiwibmJmIjoxNzEwMTMwMjE2LCJleHAiOjE3MTAxOTAyMTYsImlhdCI6MTcxMDEzMDIxNiwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.HaDWLYkHIKBzAZSVLZTBLEdwGpnLAVoG4CXHopsgwbo';
  }

}