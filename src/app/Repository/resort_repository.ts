// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// import { environment } from '../Components/environment/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {
//   private apiUrl: string = environment.apiUrl;

//   constructor(private http: HttpClient) {}

//   private buildUrl(endpoint: string): string {
//     return `${this.apiUrl}/${endpoint}`;
//   }

//   getUsers(): Observable<any> {
//     const url = this.buildUrl('users');
//     return this.http.get<any>(url);
//   }
// }
