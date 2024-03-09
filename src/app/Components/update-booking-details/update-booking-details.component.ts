import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserServiceRepo } from '../../Repository/user_repository';
import { Booking, BookingResponse, Updatedroom } from '../../Model/BookingDetaills/Booking';
import { BookingService } from '../../Service/BookingService';
import { GuestService } from '../../Service/GuestService';
import { DateService } from '../../Service/DateTime';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomResponse } from '../../Model/RoomTypes/rooms';
import { Location } from '@angular/common';
import { UpdatedBooking_details } from '../../Model/bookingDetails';

@Component({
  selector: 'app-update-booking-details',
  templateUrl: './update-booking-details.component.html',
  styleUrls: ['./update-booking-details.component.scss']
})
export class UpdateBookingDetailsComponent implements OnInit {
  booking_id!: number;
  booking_details!: BookingResponse;
  updatedvalues!: UpdatedBooking_details;
  resortid!:any;
  updatedroom!:Updatedroom;
employee!:any[];
bookingIdFromRoom!:number;
total_member_count!:number;
room_count!:number;


  constructor(
    private route: ActivatedRoute,
    private repo: ApiUserServiceRepo,
    private router: Router,
    private booking: BookingService,
    private guest: GuestService,
    private dateService:DateService,
    private _location:Location
  ) {}

  resort_name!: string;
  bookedRoomsArray: RoomResponse[]=[];
  GuestList: any;
  EmployeeList!: any[];
  totalList: any[] = [];
  members_count!: number;
  totalSelectedRooms!: number;
  food_choice: string = '';
  employee_user_ids:string='';

  ngOnInit(): void {
    debugger;
    this.route.queryParams.subscribe((params) => {
      this.booking_id = +params['id'];
      this.bookingIdFromRoom = +params['bookingIdFromRoom'];
      this.resort_name = params['resort_name']
    });
  
    this.updatedvalues = this.booking.getUpdatedBookings();
    if (this.updatedvalues && this.updatedvalues.resort_id) {
      this.getBooking();
      this.populateFormFromUpdatedValues();
      this.EmployeeList = this.guest.getEmployee();
      this.GuestList = this.guest.getGuests();
      this.totalList = this.EmployeeList.concat(this.GuestList);
      this.total_member_count=this.totalList.length;
    } else if(this.bookingIdFromRoom) {
      this.getBooking();
      this.getDate();
      this.updatedroom = this.booking.getUpdatedRoom();
      this.bookedRoomsArray = this.updatedroom.roomTypes_Req;
      this.room_count=this.bookedRoomsArray.length;
       this.EmployeeList = this.guest.getEmployee();
      this.GuestList = this.guest.getGuests();
      this.totalList = this.EmployeeList.concat(this.GuestList);
      this.total_member_count=this.totalList.length;
      console.log("Updated rooms:", this.room_count);
      this.getDate();

    }
    else
    {
      this.getBookingDetails();
    }
  }

  toCustomFormat(date: Date): string {
    if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
      date.setHours(10);
      date.setMinutes(0);
      date.setSeconds(0);
    }
    return date.toISOString().slice(0, 19);
  }

  populateFormFromUpdatedValues() {
    
    this.getDate();
    if (this.updatedvalues.roomTypes_Req.length !== 0) {
      this.bookedRoomsArray = this.updatedvalues.roomTypes_Req;
      this.room_count=this.bookedRoomsArray.length;
      console.log("Updated room:", this.room_count);
    }
    else  {
      debugger;
      this.getBooking();
      this.EmployeeList = this.guest.getEmployee();
    this.GuestList = this.guest.getGuests();
    this.totalList = this.EmployeeList.concat(this.GuestList);
    this.total_member_count=this.totalList.length;
    }
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
    employee_user_ids:new FormControl(),
    employees: new FormControl(),
    food_choice: new FormControl(),
    food_required_status: new FormControl(),
    guest_count: new FormControl(),
    guests: new FormControl(),
    member_count: new FormControl(),
    message: new FormControl(),
    resort_id: new FormControl(),
    room_count: new FormControl(),
    user_id: new FormControl()
  })

  getBookingDetails() {
    this.repo.getBookingDetailsById(this.booking_id).subscribe(
      (response: any[]) => {
        this.booking_details = response[0];
        this.patchValue(this.booking_details);
        this.EmployeeList = this.booking_details.employees;
        this.GuestList = this.booking_details.guests;
        this.totalList = this.EmployeeList.concat(this.GuestList);
        this.bookedRoomsArray = this.booking_details.bookingRoomRequests;
        this.food_choice = this.booking_details.food_choice;
        this.resortid = btoa(this.booking_details.resort_id.toString());
        this.guest.addEmployee(this.EmployeeList);
        this.guest.addUpdateGuest( this.GuestList);
        this.dateService.checkInDate = new Date(this.booking_details.check_in_date);
        this.dateService.checkOutDate = new Date(this.booking_details.check_out_date);
      }
    );
  }


  getBooking() {
    this.repo.getBookingDetailsById(this.booking_id).subscribe(
      (response: any[]) => {
        this.booking_details = response[0];
        this.resortid = btoa(this.booking_details.resort_id.toString());
        this.booking_id=this.booking_details.booking_id;
      }
    );
  }

  patchValue(response: BookingResponse) {
    const formattedCheckInDate = response.check_in_date.split('T');
    const formattedCheckOutDate = response.check_out_date.split('T');

    this.bookingUpdate.patchValue({
      check_in_date: formattedCheckInDate[0],
      check_out_date: formattedCheckOutDate[0],
      food_choice: this.food_choice,
      approver_id: this.booking_details.approver_id,
      booking_status: this.booking_details.booking_status,
      booking_id: this.booking_details.booking_id,
      food_required_status: this.booking_details.food_required_status,
      user_id: this.booking_details.user_id,
      message: this.booking_details.message,
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

  getEmployeeIds(){
    this.booking_details.employees.forEach((employee: { user_id: { toString: () => string; }; }, index: number) => {
      this.employee_user_ids += employee.user_id.toString();
      if (index < this.booking_details.employees.length - 1) {
        this.employee_user_ids += ",";
      }
    });
  }

  removeRoom(roomId: number) {
    const indexToRemove = this.bookedRoomsArray.findIndex((room: any) => room.room_type_id === roomId);

    if (indexToRemove !== -1) {
        this.bookedRoomsArray.splice(indexToRemove, 1);
        this.booking_details.room_count--;
    }
}


  removeMember(user_id: number) {
    const indexToRemove = this.totalList.findIndex((member: any) => member.user_id === user_id);
    const index= this.totalList.findIndex((member: any) => member.guest_user_id === user_id);

    if (indexToRemove !== -1 || index !== -1) {
        this.totalList.splice(indexToRemove, 1);
        this.booking_details.member_count--;
    }
  }

  addMember() {
   
    this.router.navigate(['/user/Resortrooms'], {
      queryParams: { BookingId: this.booking_id,ID:this.resortid},
    });
  }

  changeCheckinout() {
    this.router.navigate(['/user/Resortlist'], {
      queryParams: { booking_id: this.booking_id },
    });
  }

  addRoom() {
    if(!this.bookedRoomsArray)
    {
      this.booking_details.bookingRoomRequests.forEach((roomRequest: any) => {
        const roomTypeId = roomRequest.room_type_id;
        this.router.navigate(['/user/Resortrooms'], {
          queryParams:
            { ID: this.resortid, room_id: roomTypeId, bookingIdFromRoom: this.booking_id }
        });
      });
    }
    else
    {
      this.bookedRoomsArray.forEach((roomRequest: any) => {
        const roomTypeId = roomRequest.room_type_id;
        this.router.navigate(['/user/Resortrooms'], {
          queryParams:
            { ID: this.resortid, room_id: roomTypeId, bookingIdFromRoom: this.booking_id }
        });
      });
    }
  }
  back()
  {
    this.guest.resetService();
    this._location.back();
  }
  
update()
{
  this.getEmployeeIds();
  this.bookingUpdate.patchValue({
   employee_user_ids:this.employee_user_ids
  })
  console.log("from update button",this.bookingUpdate.value);
  this.guest.resetService();
}

getDate()
{
  const formattedCheckInDate = this.toCustomFormat(this.updatedvalues.check_in_date);
  const formattedCheckOutDate =  this.toCustomFormat(this.updatedvalues.check_out_date);

  const CheckInDate = formattedCheckInDate.split('T');
  const CheckOutDate = formattedCheckOutDate.split('T');

  this.bookingUpdate.patchValue({
    check_in_date: CheckInDate[0],
    check_out_date: CheckOutDate[0],
    food_choice: this.food_choice,
  });
}

}
