import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserServiceRepo } from '../../Repository/user_repository';
import { Booking, BookingResponse } from '../../Model/BookingDetaills/Booking';
import { BookingService } from '../../Service/BookingService';
import { GuestService } from '../../Service/GuestService';
import { DateService } from '../../Service/DateTime';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-booking-details',
  templateUrl: './update-booking-details.component.html',
  styleUrls: ['./update-booking-details.component.scss'] // corrected property name
})
export class UpdateBookingDetailsComponent implements OnInit {
  booking_id!: number;
  booking_details!: BookingResponse;
  updatedvalues: any[] = [];
  resortid!:any;

  constructor(
    private route: ActivatedRoute,
    private repo: ApiUserServiceRepo,
    private router: Router,
    private booking: BookingService,
    private guest: GuestService,
    private dateService:DateService
  ) {}

  resort_name!: string;
  bookedRoomsArray: any;
  GuestList: any;
  EmployeeList: any;
  totalList: any[] = [];
  members_count!: number;
  totalSelectedRooms!: number;
  food_choice: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.booking_id = +params['id'];
      this.resort_name = params['resort_name']
    });
    this.getBookingDetails();
    this.updatedvalues = this.booking.getUpdatedBookings();
    console.log(this.updatedvalues);
  }

  bookingUpdate = new FormGroup({
    approver_id: new FormControl(),
    bookingRoomRequests: new FormControl(),
    booking_id: new FormControl(),
    booking_status: new FormControl(),
    check_in_date: new FormControl(),
    check_out_date: new FormControl(),
    created_date: new FormControl(),
    employee_count: new FormControl(),
    employees: new FormControl(),
    food_choice: new FormControl(),
    food_required_status: new FormControl(),
    guest_count: new FormControl(),
    guests: new FormControl(),
    member_count: new FormControl(),
    message: new FormControl(),
    resort_id: new FormControl(),
    room_count: new FormControl(),
    stay_request_id: new FormControl(),
    user_id: new FormControl()
  })

  getBookingDetails() {
    this.repo.getBookingDetailsById(this.booking_id).subscribe(
      (response: any[]) => {
        debugger;
        console.log("Responce", response);
        this.booking_details = response[0];
        this.patchValue(this.booking_details);
        this.EmployeeList = this.booking_details.employees;
        this.GuestList = this.booking_details.guests;
        this.totalList = this.EmployeeList.concat(this.GuestList);
        this.bookedRoomsArray = this.booking_details.bookingRoomRequests;
        this.food_choice = this.booking_details.food_choice;
        
        this.resortid = btoa(this.booking_details.resort_id.toString());
    
        this.guest.addEmployee(this.booking_details.employees);
        this.guest.addGuest(this.booking_details.guests);
        this.dateService.checkInDate = new Date(this.booking_details.check_in_date);
        this.dateService.checkOutDate = new Date(this.booking_details.check_out_date);

      }
    );
  }

  patchValue(response: BookingResponse) {
    const formattedCheckInDate = response.check_in_date.split('T');
    const formattedCheckOutDate = response.check_out_date.split('T');

    this.bookingUpdate.patchValue({
      check_in_date: formattedCheckInDate[0],
      check_out_date: formattedCheckOutDate[0],
      food_choice: this.food_choice
    });
  }


  getInitials(firstName: string, lastName: string): { initials: string, backgroundColor: string } {
    let initials = '';
    if (firstName) {
      initials += firstName.charAt(0);
    }
    if (lastName) {
      initials += lastName.charAt(0);
    }

    const colors = ['orange', 'lightgreen', 'skyblue', 'red'];
    const chosenColor = Math.floor(Math.random() * colors.length);
    const backgroundColor = colors[chosenColor];

    return { initials: initials.toUpperCase(), backgroundColor };
  }

  // update()
  // {
  //   console.log('Booking details:',this.bookingUpdate.value)
  // }

  removeRoom(roomId: number) {

  }

  removeMember(memberId: number) {

  }

  addMember(id: number) {

  }

  addRoom(id: number) {

  }

  changeDate(id: number) {



      
  }

  changeCheckinout() {
    this.router.navigate(['/user/Resortlist'], {
      queryParams: { booking_id: this.booking_id },
    });
  }

room() {
    if (this.booking_details && Array.isArray(this.booking_details.bookingRoomRequests)) {
        this.booking_details.bookingRoomRequests.forEach((roomRequest: any) => {
            const roomTypeId = roomRequest.room_type_id;
            const roomTypeCount = roomRequest.room_type_count;

            console.log(`Room Type ID: ${roomTypeId}, Room Type Count: ${roomTypeCount}`);

            this.router.navigate(['/user/Resortrooms'], { queryParams:
               { ID:this.resortid,room_id:roomTypeId,room_count:roomTypeCount} });

        });

    } else {
        console.log("Booking details or bookingRoomRequests array not found");
    }

}

}
