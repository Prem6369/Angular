import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor() { }
}

export class ResortDetails {
  constructor(
    public resort_id: number,
    public name: string,
    public description: string,
    public location: string,
    public amenities: string[],
    public image_urls: string,
    public video_urls: string,
    public status: string,
    public created_date: string,
    public last_modified_date: string,
    public categories: any[],
    public coordinates: { lat: string, long: string }
  ) {}
}

export class UserProfile {
  constructor(
    public user_id: number,
    public first_name: string,
    public last_name: string,
    public claySys_email: string,
    public phone_number: string,
    public address: string,
    public role: string,
    public lead: string,
    public emplyee_id: string,
    public age: string,
    public gender: string,
    public official_id_card_no: string,
    public official_id_image_url: string,
    public claysys_id_card_image_url: string,
    public allotted_stays: string,
    public used_stays: string,
    public remaining_days: string,
    public status: string,
    public username: string,
    public created_date:string,
    public last_modified_date:string
  ) {}

}

export class getRoomTypes{
  constructor(
    public room_type_id:number,
    public name:string,
    public capacity:number,
    public availability:string,
    public description:string,
    public room_type_count:number,
    public created_date:Date,
    public last_modified_date:Date
  ){}
}
