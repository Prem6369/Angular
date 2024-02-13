import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

@Component({
  selector: 'app-resort-details',
  templateUrl: './resort-details.component.html',
  styleUrls: ['./resort-details.component.scss']
})
export class ResortDetailsComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  img:string='';
  location:string=''

  constructor(private httpclient: HttpClient,private router:Router) {}

  ngOnInit(): void {
    this.getResortDetails();
  }

  getResortDetails() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const id = 2; // or any other valid resort ID
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  
    this.httpclient.get<any>(`https://claysysresortapi.claysys.org/api/resorts/getresortdetails?resort_id=${id}`, { headers })
      .subscribe(
        (response) => {
          console.log(response);
          // Check if response contains data
          this.img=response.image_urls;
          this.location=response.location;
          if (response && response.resort_id) {
            // Create a new ResortDetails object from the response
            const newResortDetails = new ResortDetails(
              response.resort_id,
              response.name,
              response.description,
              response.location,
              response.amenities,
              response.image_urls,
              response.video_urls,
              response.status,
              response.created_date,
              response.last_modified_date,
              response.categories,
              response.coordinates
            );
            // Update resortlist with the new ResortDetails object
            this.resortlist.push(newResortDetails);
          } else {
            console.error('Empty response or response does not contain any resorts.');
          }
        },
        (error) => {
          console.error('Error fetching resort details:', error);
        }
      );
  }
  booknow(){
    this.router.navigate(['/Resortrooms']);
  }
}
