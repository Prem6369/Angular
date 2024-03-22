import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({ Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI5ZGE2NmNjYy1hMTdkLTQyZjctOTkxYy1hN2VmYWM4ODJjMmIiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMjY2ZmFjNDQtM2NkYi00MzBiLTkzZGYtMDJlZTg4NjQwMGZhIiwibmJmIjoxNzEwMTMwMjE2LCJleHAiOjE3MTAxOTAyMTYsImlhdCI6MTcxMDEzMDIxNiwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.HaDWLYkHIKBzAZSVLZTBLEdwGpnLAVoG4CXHopsgwbo` })
    const cloned_Req = req.clone({ headers })
    return next.handle(cloned_Req)
      .pipe(
        catchError(err => {
          console.log(err)
          if (err.status === 401) {
            console.log("Unauthorized");
          }
          return throwError(() => new Error('Error occured'));
        }
        )
      )

  }
}
