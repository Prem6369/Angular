import { Injectable } from "@angular/core";
import { Resort } from "../Model/ResortDetails/resortDetails";

@Injectable({
  providedIn: 'root'
})
export class ResortService {
  resorts!:Resort;

  constructor() { }

  addResort(resortDetails: Resort): void {
    this.resorts=resortDetails;
  }

  
  getResort(): any{
    return this.resorts;
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
