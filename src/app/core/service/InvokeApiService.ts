import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private apiUrl: string = environment.apiUrl;
  private apiUrl: string = 'https://localhost:7036/api';
 

  constructor(private httpClient: HttpClient) {}

  get(path: string, app: string, params?: any): Observable<any[]> {
    const url = this.getFullAPIUrl(path, app);
    const httpParams = this.getParams(params);
    return this.httpClient.get<any>(url, { params: httpParams });
  }

  post(path: string, app: string, body?: any) {
    const url = this.getFullAPIUrl(path, app);
    return this.httpClient.post<any>(url, body);
  }

  put(path: string, app: string, body: any) {
    const url = this.getFullAPIUrl(path, app);
  
    return this.httpClient.put<any>(url, body);
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


}