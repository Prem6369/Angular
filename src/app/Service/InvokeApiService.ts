import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceInvoker {
  baseUrl = 'https://localhost:7036/api';

  constructor(private http: HttpClient) {}

  get(path: string, app: string,params?: any) {
    const url = this.getFullAPIUrl(path, app);
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.getToken()
    );
    let requestOptions: any = { headers };

    if (params) {
      requestOptions.params = new HttpParams({ fromObject: params });
    }
    return this.http.get<any>(url, requestOptions);
  }




  getFullAPIUrl(path: string, app: string) {0
    return `${this.baseUrl}/${app}/${path}`;
  }


  private getToken(): string {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
  }

  getCheckinChwckout(){
    
  }

}
