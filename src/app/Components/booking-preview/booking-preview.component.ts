import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';
import { ActivatedRoute, Router } from '@angular/router';
import { GuestService } from '../../Service/GuestService';
import { BookingService } from '../../Service/BookingService';
import { Booking_details } from '../../Model/bookingDetails';
import { Location } from '@angular/common';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { GuestDetails, GuestPost } from '../../Model/GuestDetails/guestDetails';


@Component({
  selector: 'app-booking-preview',
  templateUrl: './booking-preview.component.html',
  styleUrl: './booking-preview.component.scss',
})


export class BookingPreviewComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  booking_details!: Booking_details;
  img: string = '';
  termsChecked: boolean = false;
  bookedRoomsArray: any[] = [];
  GuestEmployeeList: any[] = [];
  Resort_id!: number;
  roomTypes_Req: any[] = [];

  check_in_date: string = '';
  check_out_date: string = '';

  employee_user_ids: string = '';
  location: string = '';
  resortname: string = '';

  selectedRooms: { name: string; count: number }[] = [];
  guestDetails!: any[];
  bookedRooms: { count: number, name: string, description: string }[] = [];
  guest: GuestPost[] = [];

  user_id!: number;

  constructor(private session: SessionServiceService,
    private route: ActivatedRoute,
    private _location: Location,
    private bookingService: BookingService,
    private guestService: GuestService,
    private httpclient: HttpClient,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Resort_id = params['ID'];
      this.getResortDetails();
    });
    this.initializer();
  }

  initializer() {
    this.user_id = this.session.getUserId();
    this.guest = this.guestService.getGuests().map(guest => {
      const { type, ...guestWithoutType } = guest;
      return guestWithoutType;
  });
    this.booking_details = this.bookingService.getBookings();
    this.bookedRooms = this.booking_details.bookedRooms;
    this.guestDetails = this.booking_details.Total_List;
    this.GuestEmployeeList = this.booking_details.Total_List;
    this.bookedRoomsArray = Object.entries(this.bookedRooms).map(([key, value]) => ({
      room_type_id: key,
      room_type_count: value.count,
      name: value.name,
      description: value.description
    }));
    this.roomTypes_Req = Object.entries(this.bookedRooms).map(([key, value]) => ({
      room_type_id: Number(key),
      room_type_count: value.count,
    }));
    this.check_in_date = this.toCustomFormat(this.booking_details.check_in_date)
    this.check_out_date = this.toCustomFormat(this.booking_details.check_out_date)
  }


  getResortDetails() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const decrptyId=(atob(this.Resort_id.toString()));
    const params=new HttpParams().set('resort_id',decrptyId);

    this.httpclient
      .get<any>(
        `https://localhost:7036/api/resorts/getresortdetails`,
        { headers,params }
      )
      .subscribe(
        (response) => {
          this.img = response.image_urls;
          this.resortname = response.name;
        },
        (error) => {
          console.error('Error fetching resort details:', error);
          alert('Failed to fetch resort details. Please try again later.');
        }
      );
  }


  toCustomFormat(date: Date): string {
    if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
      date.setHours(10);
      date.setMinutes(0);
      date.setSeconds(0);
    }
    return date.toISOString().slice(0, 19);
  }
  


  //For checkbox terms and condition
  toggleSubmitButton(): void { }

  edit() {
    this._location.back()
  }
  submit() {
    const decrptyId=(atob(this.Resort_id.toString()));

    const booking = {
      user_id: this.user_id,
      resort_id: decrptyId,
      check_in_date: this.check_in_date,
      check_out_date: this.check_out_date,
      message: "please approve",
      food_choice: "veg",
      approver_id: 2,
      food_required_status: "yes",
      employee_user_ids: this.booking_details.employee_user_ids,
      booking_status: "Pending",
      roomTypes_Req: this.roomTypes_Req,
      guests: this.guest
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJiN2UyZjBmNC1iOGY0LTQwY2MtODRjMy1kYTZiYjIwMjFjYmMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiZjliYWJjOTUtOTMyYy00YTc2LWJlMzMtMTMyZDllM2I0MTc0IiwibmJmIjoxNzA4OTI0MTc1LCJleHAiOjE3MDg5ODQxNzUsImlhdCI6MTcwODkyNDE3NSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.eBRH1uS5SSiMXOBVA2Z5o2TjJydJCNqVqeXQloIIoZQ';

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    
    const url = `https://localhost:7036/api/resorts/bookresort`

    console.log("Final JSON:", booking);
    this.httpclient.post(url, booking, { headers })
      .subscribe((response) => {
        
        console.log("Booking status:", response);
        if(response!==0)
        {
          this.router.navigate(['/user/Thankyou']);
        }
        else
        {
          alert("Something went wrong")
        }
      
      })

  }

  getInitials(firstName: string, lastName: string, username: string): { initials: string, backgroundColor: string } {
    let initials = '';
    if (firstName) {
      initials += firstName.charAt(0);
    }
    if (lastName) {
      initials += lastName.charAt(0);
    }
    if (username) {
      initials += username.charAt(0);
      if (username.length > 1) {
        initials += username.charAt(1);
      }
    }

    const colors = ['orange', 'lightgreen', 'skyblue', 'red'];
    const chosenColor = Math.floor(Math.random() * colors.length);
    const backgroundColor = colors[chosenColor];

    return { initials: initials.toUpperCase(), backgroundColor };
  }

}
