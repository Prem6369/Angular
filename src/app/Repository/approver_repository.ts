import { Injectable } from '@angular/core';
import { ApiService } from '../Service/InvokeApiService';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class approver_repository {

    constructor(private apiInvoker: ApiService) { } 

    getBookingRequest(id:number):Observable<any[]>{
        const params={approver_id:id}
        return this.apiInvoker.get('getbookingrequest','resorts',params);
    }

    getResortDetails(id:number):Observable<any>{
        const params={resort_id:id}
        return this.apiInvoker.get('getresortdetails','resorts',params);
    }

    getUserProfile(id:number):Observable<any>{
        const params={user_id:id}
        return this.apiInvoker.get('userprofile','resorts',params);
    }

    geUsers():Observable<any>{
        return this.apiInvoker.get('getusers','resorts');
    }
    changeApporver(value:any)
    {
        return this.apiInvoker.put('changeapprover','resorts',value);
    }

    changeStatus(value:any)
    {
        return this.apiInvoker.put('updatestatus','resorts',value);
    }


}
