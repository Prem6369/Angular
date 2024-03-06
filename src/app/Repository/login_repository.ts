import { Injectable } from '@angular/core';
import { ApiService } from '../Service/InvokeApiService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class apiLoginService{

    constructor(private api:ApiService){}


    signup(body: any): Observable<any> {
        return this.api.post("createuser", "resorts", body);
    }

    signin(body:any):Observable<any>{
        return this.api.post("signin","login",body)
    }
    
}