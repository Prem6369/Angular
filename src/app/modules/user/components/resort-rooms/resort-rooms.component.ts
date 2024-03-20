import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../../../core/model/ResortDetails/resortDetails';
import { getRoomTypes } from '../../../../core/model/RoomTypes/rooms';
import { DateService } from '../../../../core/service/DateTime';
import { GuestDetails } from '../../../../core/model/GuestDetails/guestDetails';
import { BookingService } from '../../../../core/service/BookingService';
import { GuestService } from '../../../../core/service/GuestService';
import { SessionServiceService } from '../../../../core/service/Session/session-service.service';
import { ApiServiceRepo } from '../../../../core/repository/resort_repository';
import { Location } from '@angular/common';
import { encryptDecrypt } from '../../../../core/service/EncryptDecrypt';


@Component({
  selector: 'app-resort-rooms',
  templateUrl: './resort-rooms.component.html',
  styleUrls: ['./resort-rooms.component.scss']
})

export class ResortRoomsComponent implements OnInit  {
  selectedTabIndex: number = 0;

  resortlist: ResortDetails[] = [];
  ResortRoom: getRoomTypes[] = [];
  guestDetails: GuestDetails[] = [];
  isGuest: boolean = false;
  totalDays!: number;
  totalNights!: number;
  img: string = '';
  totalSelectedRooms: number = 0;

  location: string = '';
  resortname: string = '';

  total_guest!: any;
  total_employees!: any;
  total_list!: any[];

  total_count!: number;
  employee_count!: number;
  guest_count!: number;
  user_id!: number;
  bookingIdFromRoom!:number;

  bookedRooms: { [key: string]: {room_type_id: number, count: number, name: string, description: string, number_of_rooms: number,resort_id:number } } = {};
  Resort_id!: number;
  Room_id!: number;

  Room_details: any[] = [];
  employee_user_ids: string = '';

  roomTypes_Req:any[]=[]
  bookedRoomsArray:any[]=[]
  booking_id!:number;

  roomid!:number; 
  roomcount!:number;

  constructor(private repository:ApiServiceRepo,
    private session: SessionServiceService, 
    private route: ActivatedRoute, 
    private dateService: DateService, 
    private bookingService: BookingService,
     private guestService: GuestService,
      private router: Router,
      private encryptdecrypt:encryptDecrypt, 
      private _location: Location) { }
  check_in_date!: Date;
  check_out_date!: Date;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Resort_id = params['ID'];
      const bookinid=params['BookingId'];
      if(bookinid){
        this.booking_id=this.encryptdecrypt.decrypt(bookinid)
      }
      const roomid=params['room_id'];
      if(roomid){
        this.roomid=this.encryptdecrypt.decrypt(roomid)
      }
  
      this.roomcount =params['room_count']
      const bookingidfromroom=params['bookingIdFromRoom'];
      if(bookingidfromroom){
        this.bookingIdFromRoom=this.encryptdecrypt.decrypt(bookingidfromroom);
      }
  
      const selectedTab = params['selectedTab'];
      if (selectedTab === 'tab2') {
            this.selectedTabIndex = 1; 
      }
    });
    this.getResortDetails();
    this.user_id = this.session.getUserId();
    this.initializer()
    this.calculateDayAndNight();
  }
  
 
  getResortDetails() {
    const decrptyId = (atob(this.Resort_id.toString()))
    this.repository.getResortById(decrptyId).subscribe(
        (response) => {
          console.log("newRepo",response)
          this.img = response.image_urls;
          this.location = response.location;
          this.resortname = response.name;
      
          response.categories.forEach((category: any) => {
            this.Room_id = category.room_type_id;
            this.Room_details.push({
              room_type_id: category.room_type_id,
              name: category.name,
              number_of_rooms: category.number_of_rooms,
              capacity: category.capacity,
              description: category.description,
              resort_id:category.resort_id
            });  debugger;
          });
        },
      );
  }

  initializer() {
    this.check_in_date = this.dateService.checkInDate;
    this.check_out_date = this.dateService.checkOutDate;
    this.total_guest = this.guestService.getGuests();
    this.total_employees = this.guestService.getEmployee();
    this.total_list = this.total_employees.concat(this.total_guest)
    this.employee_count = this.total_employees.length;
    this.guest_count = this.total_guest.length;
    this.total_count = this.employee_count + this.guest_count;
  }

isTabDisabled(index: number): boolean {
  if (this.booking_id || this.roomid) {
    return index !== this.selectedTabIndex;
  } else {
    return false;
  }
}


  getEmployeeIds() {
    this.total_employees.forEach((employee: { user_id: { toString: () => string; }; }, index: number) => {
      this.employee_user_ids += employee.user_id.toString();
      if (index < this.total_employees.length - 1) {
        this.employee_user_ids += ",";
      }
    });
  }

  increment(room_type_id: number, name: string, description: string, number_of_rooms: number,resort_id:number) {
    if (!this.bookedRooms[room_type_id]) {
      this.bookedRooms[room_type_id] = { room_type_id:room_type_id,count: 0, name: name, description: description, number_of_rooms: number_of_rooms,resort_id:resort_id};
    }
    if (number_of_rooms > this.bookedRooms[room_type_id].count) {
      this.bookedRooms[room_type_id].count++;
      this.updateSelectedRooms();
    } else {
      alert(`Only ${number_of_rooms} Rooms Available`)
    }
  }
 
 
  decrement(room_type_id: number) {
    if (this.bookedRooms[room_type_id] && this.bookedRooms[room_type_id].count > 0) {
      this.bookedRooms[room_type_id].count--;
      this.updateSelectedRooms();
    }
  }
 
 
  updateSelectedRooms() {
    this.totalSelectedRooms = Object.values(this.bookedRooms).reduce((total, room) => total + room.count, 0);
  }


  next() {
    this.getEmployeeIds();
    if(this.booking_id)
    {
      if(this.selectedTabIndex ===1)
      {
        const bookingid=this.encryptdecrypt.encrypt(this.booking_id);
        this.router.navigate(['/user/update-booking'], { queryParams: { ID: this.Resort_id,id:bookingid,AddMember:true } }); 
      }
      else
      {
        const decryptId=(atob(this.Resort_id.toString()));
        this.bookedRoomsArray = Object.entries(this.bookedRooms).map(([key, value]) => ({
          room_type_id: value.room_type_id,
          room_type_count: value.count,
          name: value.name,
          description: value.description,
          resort_id:decryptId
        }));
          const updatebooking={
          resort_id:this.Resort_id,
          check_in_date: this.check_in_date,
          check_out_date: this.check_out_date,
          roomTypes_Req: this.bookedRoomsArray
        }
          const bookingid=this.encryptdecrypt.encrypt(this.booking_id);
          this.bookingService.UpdatedBooking(updatebooking);
          this.router.navigate(['/user/update-booking'], { queryParams: { ID: this.Resort_id,id:bookingid,AddMember:true } }); 
      }
    }
    else if(this.roomid){
      const decryptId=(atob(this.Resort_id.toString()));
      this.bookedRoomsArray = Object.entries(this.bookedRooms).map(([key, value]) => ({
        room_type_id: value.room_type_id,
        room_type_count: value.count,
        name: value.name,
        description: value.description,
        resort_id:decryptId
      }));
      const updatedroom={
        resort_id: this.Resort_id,
        roomTypes_Req: this.bookedRoomsArray
      }
      this.dateService.addCheckin(this.check_in_date);
      this.dateService.addCheckout(this.check_out_date);
      this.bookingService.Updatedrooms(updatedroom);
      const bookingIdFromRoom=this.encryptdecrypt.encrypt(this.bookingIdFromRoom);
      const bookingid=this.encryptdecrypt.encrypt(this.booking_id);
      if(this.bookedRoomsArray.length>0){
        this.router.navigate(['/user/update-booking'], { queryParams: { id:bookingid ,bookingIdFromRoom: bookingIdFromRoom ,ID: this.Resort_id } });
      }
      else{
        alert("please select the room")
      }
    }
    else{ 
      debugger;  
      if ((this.employee_count != 0 || this.guest_count != 0) && this.totalSelectedRooms != 0) {
      const booking_details = {
        user_id: this.user_id,
        resort_id: this.Resort_id,
        check_in_date: this.check_in_date,
        check_out_date: this.check_out_date,
        employee_user_ids: this.employee_user_ids,
        totalSelectedRooms: this.totalSelectedRooms,
        days: this.totalDays,
        nights: this.totalNights,
        bookedRooms: this.bookedRooms,
        members_count: this.total_count,
        Total_List: this.total_list,
      };
      this.bookingService.addBooking(booking_details);
      this.router.navigate(['/user/booking-preview'], { queryParams: { ID: this.Resort_id } });
    }}

  }


  removeMember(user_id: number) {
    debugger;
      const indexToRemove = this.total_list.findIndex(member => member.user_id === user_id || member.guest_user_id === user_id);
      if (indexToRemove !== -1) {
        if (this.total_list[indexToRemove].hasOwnProperty('guest_user_id')) {
            this.total_guest.splice(this.total_guest.findIndex((member: { guest_user_id: number; }) => member.guest_user_id === user_id), 1);
        this.guest_count--;
          } else {
            this.total_employees.splice(this.total_employees.findIndex((member: { user_id: number; }) => member.user_id === user_id), 1);
        this.employee_count--;
          }
        this.total_list.splice(indexToRemove, 1);
        this.total_count--;
    }
  }


  editGuest(guest_user_id: number) {
    if(this.booking_id)
    {
      const index=this.total_list.findIndex((member:any)=>member.guest_user_id===guest_user_id);
      this.total_list.splice(index,1);
      this.router.navigate(['/user/Addguest'], { queryParams: { id:guest_user_id,booking_id:this.booking_id }});
    }
    else{
      const index=this.total_list.findIndex((member:any)=>member.guest_user_id===guest_user_id);
      this.total_list.splice(index,1);
      this.router.navigate(['/user/Addguest'], { queryParams: { id:guest_user_id } });
    }
    }



  calculateDayAndNight() {
    const checkInDateTime = new Date(this.check_in_date);
    checkInDateTime.setHours(10, 0, 0, 0);

    const checkOutDateTime = new Date(this.check_out_date);
    checkOutDateTime.setHours(20, 0, 0, 0);

    if (checkOutDateTime > checkInDateTime) {

      const differenceInMs = checkOutDateTime.getTime() - checkInDateTime.getTime();
      this.totalDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
      this.totalNights = this.totalDays - 1;
    }
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
}
