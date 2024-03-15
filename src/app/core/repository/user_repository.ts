import { Injectable } from '@angular/core';
import { ApiService } from '../service/InvokeApiService';
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

    getBookingDetailsById(booking_id:number):Observable<any>{
        const params={booking_id:booking_id}
        return this.api.get('getbookingbyid','resorts',params)
    }

    getAllUsers():Observable<any>{
        return this.api.get('getusers','resorts');
    }
}