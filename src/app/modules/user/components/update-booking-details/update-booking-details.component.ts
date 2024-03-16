import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserServiceRepo } from '../../../../core/repository/user_repository';
import { Booking, BookingResponse, Updatedroom } from '../../../../core/model/BookingDetaills/Booking';
import { BookingService } from '../../../../core/service/BookingService';
import { GuestService } from '../../../../core/service/GuestService';
import { DateService } from '../../../../core/service/DateTime';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomResponse } from '../../../../core/model/RoomTypes/rooms';
import { Location } from '@angular/common';
import { UpdatedBooking_details } from '../../../../core/model/BookingDetaills/bookingDetails';
import { ApiServiceRepo } from '../../../../core/repository/resort_repository';
import { SessionServiceService } from '../../../../core/service/Session/session-service.service';
import { encryptDecrypt } from '../../../../core/service/EncryptDecrypt';


@Component({
  selector: 'app-update-booking-details',
  templateUrl: './update-booking-details.component.html',
  styleUrls: ['./update-booking-details.component.scss']
})
export class UpdateBookingDetailsComponent implements OnInit {
  booking_id!: number;
  approver_id!:number;
  booking_status:string='';
  food_required_status:string='';
  message:string='';

  booking_details!: BookingResponse;
  updatedvalues!: UpdatedBooking_details;
  resortid!: any;
  updatedroom!: Updatedroom;
  employee!: any[];
  bookingIdFromRoom!: number;
  total_member_count!: number;
  room_count!: number;
  roomTypes_Req: any[] = [];
  resort_id_Checkin!: number;

  constructor(
    private route: ActivatedRoute,
    private repo: ApiUserServiceRepo,
    private apiRepo: ApiServiceRepo,
    private router: Router,
    private booking: BookingService,
    private guest: GuestService,
    private dateService: DateService,
    private _location: Location,
    private sessionService:SessionServiceService,
    private encrytiondecryption:encryptDecrypt
  ) { }

  user_id!:number;
  resort_name!: string;
  bookedRoomsArray: RoomResponse[] = [];
  GuestList: any;
  EmployeeList!: any[];
  totalList: any[] = [];
  members_count!: number;
  totalSelectedRooms!: number;
  food_choice: string = '';
  employee_user_ids: string = '';
  AddMember: boolean = false;
  ngOnInit(): void {
    debugger;
    this.route.queryParams.subscribe((params) => {
      debugger;
      const bookingid: string = params['id'];
      if (bookingid) {
        try {
          const decryptedBookingId = this.encrytiondecryption.decrypt(bookingid);
          console.log("Decrypted booking id:", decryptedBookingId);
          this.booking_id = decryptedBookingId;
        } catch (error) {
          console.error("Error decrypting booking id:", error);
        }
      }
      debugger;
      const bookingIdFromRoom: string = params['bookingIdFromRoom'];
      if (bookingIdFromRoom) {
        try {
          debugger;
          const decryptedBookingIdFromRoom = this.encrytiondecryption.decrypt(bookingIdFromRoom);
          this.bookingIdFromRoom = decryptedBookingIdFromRoom;
        } catch (error) {
          console.error("Error decrypting booking id from room:", error);
        }
      }
      this.AddMember = params['AddMember'];
      debugger;
         this.resort_id_Checkin = params['ID'];;
 
    });




    this.user_id=this.sessionService.getUserId();
    this.updatedvalues = this.booking.getUpdatedBookings();

    if (this.updatedvalues && this.updatedvalues.roomTypes_Req.length !== 0) {
      this.populateFormFromUpdatedValues();
      this.getMemebers();
      this.getDefaultValues();
      this.getResortName();
    }
    else if (this.AddMember) {
      this.getDate();
      this.getMemebers();
      this.getDefaultValues();
      this.getResortName();

      if (this.updatedvalues.roomTypes_Req.length !== 0) {
        this.bookedRoomsArray = this.updatedvalues.roomTypes_Req;
        this.updateSelectedRooms();
        
      }
      else if (this.booking.getUpdatedRoom()) {
        this.updatedroom = this.booking.getUpdatedRoom();
        this.bookedRoomsArray = this.updatedroom.roomTypes_Req;
        this.updateSelectedRooms();
        this.getDate();
        this.getMemebers();
      }
      else {
        this.getBooking();
      }
    }
    else if (this.bookingIdFromRoom) {
      debugger;
      this.booking_id = this.bookingIdFromRoom;    

      this.getDate();
      this.updatedroom = this.booking.getUpdatedRoom();
      this.bookedRoomsArray = this.updatedroom.roomTypes_Req;
      this.updateSelectedRooms();
      this.getMemebers();
      this.getBooking();
      this.getResortName();

    }
    else {
      this.getBookingDetails();
    }
  }

  updateSelectedRooms() {
    this.totalSelectedRooms = Object.values(this.bookedRoomsArray).reduce((total, room) => total + room.room_type_count, 0);
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
      this.updateSelectedRooms();
    }
    else {
      this.getBooking();
    }
  }

  bookingUpdate = new FormGroup({
    approver_id: new FormControl(),
    roomTypes_Req: new FormControl(),
    booking_id: new FormControl(),
    booking_status: new FormControl(),
    check_in_date: new FormControl(),
    check_out_date: new FormControl(),
    employee_user_ids: new FormControl(),
    food_choice: new FormControl(),
    food_required_status: new FormControl(),
    guests: new FormControl(),
    message: new FormControl(),
    resort_id: new FormControl(),
    user_id: new FormControl()
  })

  getBookingDetails() {
    

    this.repo.getBookingDetailsById(this.booking_id).subscribe(
      (response: any[]) => {
        this.booking_details = response[0];
        console.log("FirstResponse::",this.booking_details)
        this.patchValue(this.booking_details);
        this.EmployeeList = this.booking_details.employees;
        this.GuestList = this.booking_details.guests;
        this.totalList = this.EmployeeList.concat(this.GuestList);
        this.bookedRoomsArray = this.booking_details.bookingRoomRequests;
        this.food_choice = this.booking_details.food_choice;
        this.resortid = btoa(this.booking_details.resort_id.toString()); 
        this.total_member_count =  this.totalList.length;
        this.totalSelectedRooms = this.booking_details.room_count;
        this.guest.addEmployee(this.EmployeeList);
        this.guest.addUpdateGuest(this.GuestList);
        this.dateService.checkInDate = new Date(this.booking_details.check_in_date);
        this.dateService.checkOutDate = new Date(this.booking_details.check_out_date);
        this.approver_id=this.booking_details.approver_id;
        this.booking_id=this.booking_details.booking_id;
        this.booking_status=this.booking_details.booking_status;
        this.food_required_status=this.booking_details.food_required_status;
        this.message=this.booking_details.message;
        this.getResortName()

      }
    );
  }

  getMemebers() {
    this.EmployeeList = this.guest.getEmployee();
    this.GuestList = this.guest.getGuests();
    this.totalList = this.EmployeeList.concat(this.GuestList);
    this.total_member_count = this.totalList.length;
  }

  getBooking() {
    this.repo.getBookingDetailsById(this.booking_id).subscribe(
      (response: any[]) => {
        this.booking_details = response[0];
        this.resortid = btoa(this.booking_details.resort_id.toString()); 
         this.approver_id=this.booking_details.approver_id;
        this.booking_id=this.booking_details.booking_id;
        this.booking_status=this.booking_details.booking_status;
        this.food_required_status=this.booking_details.food_required_status;
        this.message=this.booking_details.message;
        if (!this.bookingIdFromRoom) {
          this.bookedRoomsArray = this.booking_details.bookingRoomRequests;
          this.updateSelectedRooms();
        }
      }
    );
  }

  getDefaultValues() {
    this.repo.getBookingDetailsById(this.booking_id).subscribe(
      (response: any[]) => {
        this.booking_details = response[0];
         this.approver_id=this.booking_details.approver_id;
        this.booking_id=this.booking_details.booking_id;
        this.booking_status=this.booking_details.booking_status;
        this.food_required_status=this.booking_details.food_required_status;
        this.message=this.booking_details.message;
      }
    );
  }


  patchValue(response: BookingResponse) {
    const formattedCheckInDate = response.check_in_date.split('T');
    const formattedCheckOutDate = response.check_out_date.split('T');

    this.bookingUpdate.patchValue({
      check_in_date: formattedCheckInDate[0],
      check_out_date: formattedCheckOutDate[0],
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
  

  getEmployeeIds() {
    debugger;
    this.EmployeeList.forEach((employee: { user_id: { toString: () => string; }; }, index: number) => {
      this.employee_user_ids += employee.user_id.toString();
      if (index < this.EmployeeList.length - 1) {
        this.employee_user_ids += ",";
      }
    });
  }

  removeRoom(roomId: number) {
    const indexToRemove = this.bookedRoomsArray.findIndex((room: any) => room.room_type_id === roomId);

    if (indexToRemove !== -1) {
      const roomToRemove = this.bookedRoomsArray[indexToRemove];
      if (roomToRemove) {
        const roomCount = roomToRemove.room_type_count;
        this.bookedRoomsArray.splice(indexToRemove, 1);
        if (roomCount) {
          this.totalSelectedRooms = this.totalSelectedRooms - roomCount;
        }
      }
    }
  }

  removeMember(user_id: number) {
    const indexToRemove = this.totalList.findIndex(member => member.user_id === user_id || member.guest_user_id === user_id);

    if (indexToRemove !== -1) {
        if (this.totalList[indexToRemove].hasOwnProperty('guest_user_id')) {
            this.GuestList.splice(this.GuestList.findIndex((member: { guest_user_id: number; }) => member.guest_user_id === user_id), 1);
        } else {
            this.EmployeeList.splice(this.EmployeeList.findIndex(member => member.user_id === user_id), 1);
        }
        this.totalList.splice(indexToRemove, 1);
        this.total_member_count--;
    }
}

addMember() {
  debugger;
  const bookingid =this.encrytiondecryption.encrypt(this.booking_id);
  this.router.navigate(['/user/Resortrooms'],
   {queryParams: { BookingId: bookingid, ID: this.resort_id_Checkin || this.resortid ,selectedTab: 'tab2' },
  });
}

  changeCheckinout() {
    const bookingid =this.encrytiondecryption.encrypt(this.booking_id);
    this.router.navigate(['/user/Resortlist'], {

      queryParams: { booking_id: bookingid },
    });
  }

  addRoom() {
    if (this.bookedRoomsArray.length > 0) {
      debugger;
      this.booking.resetBooking();
      this.bookedRoomsArray.forEach((roomRequest: any) => {
        const roomTypeId = roomRequest.room_type_id;
        const resortID = btoa(roomRequest.resort_id); 
        
        const roomid=this.encrytiondecryption.encrypt(roomTypeId);
        const bookingid=this.encrytiondecryption.encrypt(this.booking_id);
        this.router.navigate(['/user/Resortrooms'], {
          queryParams:
            { ID: resortID, room_id: roomid, bookingIdFromRoom: bookingid }
        });
      });
    }
   
  }
  back() {
    this.guest.resetService();
    this.dateService.resetDate();
    this.booking.resetBooking();

    this.router.navigate(['/user/booking-details'])
  }

  update() {
    debugger;
    this.getEmployeeIds();
    this.setValue();
    debugger;
    this.apiRepo.updateBookingDetails(this.bookingUpdate.value).subscribe(
      (response) => {
        if (response) {
          console.log("updated response:",response)
          alert("Booking details updated successfully");
          this.guest.resetService();
          this.dateService.resetDate();
          this.router.navigate(['/user/booking-details'])
        }
        else {
          alert("something went wrong!!!");
        }
      }
    )
    debugger;
    console.log("from update button", this.bookingUpdate.value);
    this.guest.resetService();
    this.dateService.resetDate();
    this.booking.resetBooking();
  }

  getDate() {
    const formattedCheckInDate = this.toCustomFormat(this.dateService.getCheckin());
    const formattedCheckOutDate = this.toCustomFormat(this.dateService.getCheckout());

    const CheckInDate = formattedCheckInDate.split('T');
    const CheckOutDate = formattedCheckOutDate.split('T');

    this.bookingUpdate.patchValue({
      check_in_date: CheckInDate[0],
      check_out_date: CheckOutDate[0],
      food_choice: this.food_choice,
    });
  }


  setValue()
  {
    debugger;
    this.roomTypes_Req = Object.entries(this.bookedRoomsArray).map(([key, value]) => ({
      room_type_id: value.room_type_id,
      room_type_count: value.room_type_count,
    }));

    debugger;

    const finalResortId=this.resortid?Number(atob(this.resortid.toString())):Number(atob(this.resort_id_Checkin.toString()))

    this.bookingUpdate.patchValue({
      guests: this.GuestList,
      roomTypes_Req: this.roomTypes_Req,
      resort_id: finalResortId,
      employee_user_ids: this.employee_user_ids,
      approver_id:this.approver_id,
      booking_status: this.booking_status,
      booking_id: this.booking_id,
      food_required_status:   this.food_required_status,
      user_id:this.user_id,
      message:this.message,
    });
  }

  getResortName(){
    debugger;
    let finalResortId=this.resortid?(atob(this.resortid.toString())):(atob(this.resort_id_Checkin.toString()))

    this.apiRepo.getResortById(finalResortId).subscribe(
      (response)=>{
        this.resort_name=response.name;
      }
    )
  }
}
