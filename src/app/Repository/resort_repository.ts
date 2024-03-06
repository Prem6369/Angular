import { Injectable } from '@angular/core';
import { ApiService } from '../Service/InvokeApiService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceRepo {

    constructor(private api:ApiService){}

    getAllResort():Observable<any>{
        return this.api.get('getallresorts','resorts');
    }

    getAvailableResort(checkInDate: Date, checkOutDate: Date): Observable<any> {
      const params = {
        check_in_date: checkInDate.toISOString().split('T')[0],
        check_out_date: checkOutDate.toISOString().split('T')[0]
      };
      return this.api.get('getroomavailability', 'resorts', params);
    }
    

    getResortById(decrptyId:string):Observable<any>{
      const params ={
        resort_id:decrptyId
      };
      return this.api.get('getresortdetails','resorts',params)
    }
}
