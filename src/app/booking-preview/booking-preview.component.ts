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
  selector: 'app-booking-preview',
  templateUrl: './booking-preview.component.html',
  styleUrl: './booking-preview.component.scss'
})
export class BookingPreviewComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  img: string = '';
  
  location: string = '';
  resortname: string = '';
  rooms: { name: string; value: number,icon:string }[] = [
    { name: 'Single Room', value: 0 ,icon:'fa-solid fa-bed fa-2x check'},
    { name: 'Suite Room', value: 0 ,icon:'fa-solid fa-hospital fa-2x check'}
  ];

  total_members: { name: string;profile:string;contact: number,type:string;icon:string }[] = [
    { name: 'Samual James', contact: 78945612320 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Employee'},
    { name: 'Santhra Philip', contact: 78945612320 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Guest'},
    { name: 'Henry Fuller', contact: 78945612320 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Guest'}
  ];

  selectedRooms: { name: string; count: number }[] = [];

  constructor(private httpclient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getResortDetails();
  }

  getResortDetails() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const id = 2;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpclient
      .get<any>(
        `https://claysysresortapi.claysys.org/api/resorts/getresortdetails?resort_id=${id}`,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log(response);

          this.img = response.image_urls;
          this.location = response.location;
          this.resortname = response.name;
          if (response && response.resort_id) {
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
            this.resortlist.push(newResortDetails);
          } else {
            console.error(
              'Empty response or response does not contain any resorts.'
            );
          }
        },
        (error) => {
          console.error('Error fetching resort details:', error);
        }
      );
  }

  nextpage() {
    this.router.navigate(['/Thankyou']);
  }


  increment(index: number) {
    this.rooms[index].value++;
    this.updateSelectedRooms();
  }

  decrement(index: number) {
    if (this.rooms[index].value > 0) {
      this.rooms[index].value--;
      this.updateSelectedRooms();
    }
  }
  totalSelectedRooms: number = 0;

  updateSelectedRooms() {
    this.totalSelectedRooms = this.rooms.reduce((total, room) => total + room.value, 0);
  }

  BackToResort(){
    this.router.navigate(['/ResortDetails']);
  }

  submit() {
    this.router.navigate(['/Thankyou']);
  }

}
