import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUserServiceRepo } from '../../Repository/user_repository';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingResponse } from '../../Model/BookingDetaills/Booking';
import { RoomResponse } from '../../Model/RoomTypes/rooms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-booking-details',
  templateUrl: './update-booking-details.component.html',
  styleUrls: ['./update-booking-details.component.scss']
})
export class UpdateBookingDetailsComponent implements OnInit {

  booking_id!: number;
  booking_details!: BookingResponse;
  resort_name!: string;
  bookedRoomsArray: RoomResponse[]=[];
  GuestList: any;
  EmployeeList: any;
  totalList: any[] = [];
  members_count!: number;
  totalSelectedRooms!: number;
  food_choice: string = '';
  employee_user_ids:string='';

  constructor(private route: ActivatedRoute,
    private repo: ApiUserServiceRepo,
    private _location:Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.booking_id = +params['id'];
      this.resort_name = params['resort_name']
    });
    this.getBookingDetails();
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
        debugger;
       // console.log("Responce", response);
        this.booking_details = response[0];
        this.patchValue(this.booking_details);
        this.EmployeeList = this.booking_details.employees;
        this.GuestList = this.booking_details.guests;
        this.totalList = this.EmployeeList.concat(this.GuestList);
        this.bookedRoomsArray = this.booking_details.bookingRoomRequests;
        this.food_choice = this.booking_details.food_choice;

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

  addMember(id: number) {

  }

  addRoom(id: number) {

  }

  changeDate(id: number) {

  }


  back()
  {
    this._location.back();
  }
  
update()
{
  this.getEmployeeIds();
  this.bookingUpdate.patchValue({
   employee_user_ids:this.employee_user_ids
  })
  console.log("from update button",this.bookingUpdate.value);
}

}
