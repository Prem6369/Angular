import { Injectable } from '@angular/core';
import { ApiService } from '../Service/InvokeApiService';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class admin_room_repository {

    constructor(private apiInvoker: ApiService) { }

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
