import { Injectable } from '@angular/core';
import { ApiService } from '../Service/InvokeApiService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiUserServiceRepo{
    constructor(private api:ApiService){}

    userProfileById(userid:any):Observable<any> {
        const params= {
            user_id:userid
        }
        return this.api.get("userprofile","resorts",params);
    }

    updateProfile(body:any):Observable<any>{

        return this.api.put("updateuserprofile","resorts",body);
    }

    bookedResortById(userId:any):Observable<any>{
        const params={
            user_id:userId
        }
        return this.api.get('getbookeduserlist','resorts',params)
    }
}