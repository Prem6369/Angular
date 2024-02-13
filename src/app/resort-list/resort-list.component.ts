import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { Router } from '@angular/router';
 
// Define custom date format
export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MM.YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MM.YYYY',
  },
};
 
export class ResortLists {
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
 
@Component({
  selector: 'app-resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.scss'],
  // Configure custom date format
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})

export class ResortListComponent {
  resortlist: ResortLists[] = [];
 
  range = new FormGroup({
    start: new FormControl<Date | null>(new Date()), // Set start date to today's date
    end: new FormControl<Date | null>(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)), // Set end date to tomorrow's date
  });
 
  constructor(private httpclient: HttpClient,private router:Router) {}
 
  ngOnInit(): void {
    this.getResortDetails();
  }
 
  getResortDetails() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
 
    this.httpclient.get<any[]>(`https://claysysresortapi.claysys.org/api/resorts/getallresorts`, { headers })
      .subscribe(
        (response) => {
          console.log(response);
 
          // Check if response is an array
          if (Array.isArray(response)) {
            // Loop through each object in the array
            response.forEach((resortObject) => {
              // Create a new ResortLists object from the current resortObject
              const newResortDetails = new ResortLists(
                resortObject.resort_id,
                resortObject.name,
                resortObject.description,
                resortObject.location,
                resortObject.amenities,
                resortObject.image_urls,
                resortObject.video_urls,
                resortObject.status,
                resortObject.created_date,
                resortObject.last_modified_date,
                resortObject.categories,
                resortObject.coordinates
              );
              // Push the new ResortLists object into the resortlist array
              this.resortlist.push(newResortDetails);
            });
          } else {
            console.error('Response is not an array.');
          }
        },
      );
  } 
  
  nextpage(){
    this.router.navigate(['/ResortDetails']);
  }
}
