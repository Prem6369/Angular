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
import { ApiServiceRepo } from '../../Repository/resort_repository';


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
  bookedRooms: { room_type_id:number,count: number, name: string, description: string }[] = [];
  guest: GuestPost[] = [];

  user_id!: number;

  constructor(private session: SessionServiceService,
    private route: ActivatedRoute,
    private _location: Location,
    private bookingService: BookingService,
    private guestService: GuestService,
    private router: Router,
    private repository:ApiServiceRepo) {
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
      const { type, guest_user_id, ...guestWithoutTypeAndId } = guest;
      return guestWithoutTypeAndId;
  });
  
    this.booking_details = this.bookingService.getBookings();
    this.bookedRooms = this.booking_details.bookedRooms;
    this.guestDetails = this.booking_details.Total_List;
    this.GuestEmployeeList = this.booking_details.Total_List;
    this.bookedRoomsArray = Object.entries(this.bookedRooms).map(([key, value]) => ({
      room_type_id: value.room_type_id,
      room_type_count: value.count,
      name: value.name,
      description: value.description
    }));
    this.roomTypes_Req = Object.entries(this.bookedRooms).map(([key, value]) => ({
      room_type_id: value.room_type_id,
      room_type_count: value.count,
    }));
    this.check_in_date = this.toCustomFormat(this.booking_details.check_in_date)
    this.check_out_date = this.toCustomFormat(this.booking_details.check_out_date)
  }


  getResortDetails() {
    const decrptyId=(atob(this.Resort_id.toString()));

    this.repository.getResortById(decrptyId).subscribe((response) => {
      
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
    console.log("Final JSON:", booking);

    this.repository.bookResort(booking).subscribe((response)=>{
      console.log("Booking status",response)
      if(response.booking_id!==0)
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
