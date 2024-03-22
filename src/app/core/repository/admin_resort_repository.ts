import { Injectable } from '@angular/core';
import { ApiService } from '../service/InvokeApiService';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class admin_resort_repository {

    constructor(private apiInvoker: ApiService) { }

    insertResort(resort: any) {
        return this.apiInvoker.post('insertresortdetails', 'resorts', resort);
    }

    updateResort(resort: any) {
        return this.apiInvoker.put('updateresortdetails', 'resorts', resort);
    }

    getAllResort():Observable<any[]>{
        return this.apiInvoker.get('getallresorts','resorts');
    }
    
    insertRoom(room: any) {
        return this.apiInvoker.post('addroomtype', 'resorts', room);
    }

    updateRoom(room: any) {
        return this.apiInvoker.put('updateroomtype', 'resorts', room);
    }

    getAllRoom():Observable<any[]>{
        return this.apiInvoker.get('getroomtypes','resorts');
    }

}
