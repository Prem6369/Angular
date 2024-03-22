import { Injectable } from "@angular/core";
import { Resort } from "../model/ResortDetails/resortDetails";

@Injectable({
  providedIn: 'root'
})
export class ResortService {
  resorts!:Resort;
  rooms:any;

  constructor() { }


  addRoom(updatedRoom: any): void {
    this.rooms=updatedRoom;
  }

  
  getRoom(): any{
    return this.rooms;
  }


  addResort(resortDetails: Resort): void {
    this.resorts=resortDetails;
  }

  
  getResort(): any{
    return this.resorts;
  }

  resetRoom(){
    this.rooms=''
  }
  
  resetService() {
    this.resorts = {
      resort_id:-1,
      name: '',
      description: '',
      location: '',
      amenities: [],
      image_urls: '',
      video_urls: '',
      status: '',
      categories: [],
      coordinates: { lat: '', long: '' }
    };
    console.log("After reset:",this.resorts)
  }
}
