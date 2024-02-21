import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails'; 
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../Service/GuestService';
import { BookingService } from '../../Service/BookingService';
import { Booking_details } from '../../Model/bookingDetails';
import { Location } from '@angular/common';
@Component({
  selector: 'app-booking-preview',
  templateUrl: './booking-preview.component.html',
  styleUrl: './booking-preview.component.scss',
})
export class BookingPreviewComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  booking_details!:Booking_details;
  img: string = '';
  termsChecked: boolean = false;
  bookedRoomsArray:any[]=[];
  
  location: string = '';
  resortname: string = '';

  selectedRooms: { name: string; count: number }[] = [];
  guestDetails!: any[];
  bookedRooms: { count: number, name: string, description: string }[] = [];

  constructor(private _location:Location,private bookingService:BookingService,private guestService: GuestService,private httpclient: HttpClient, private router: Router,private routing: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getResortDetails();
    this.booking_details=this.bookingService.getBookings();
    this.bookedRooms=this.booking_details.bookedRooms;
    this.guestDetails=this.booking_details.total_members;
     this.bookedRoomsArray = Object.entries(this.bookedRooms).map(([key, value]) => ({
      id: key,
      count: value.count,
      name: value.name,
      description: value.description
  }));
  
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
        }
      );
  }
  toggleSubmitButton(): void {}

  edit()
  {
    this._location.back()
  }
  submit() {
    this.router.navigate(['/Thankyou']);
  }

}
