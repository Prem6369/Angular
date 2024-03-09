import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';
import { getRoomTypes } from '../../Model/RoomTypes/rooms';
import { DateService } from '../../Service/DateTime';
import { GuestDetails } from '../../Model/GuestDetails/guestDetails';
import { BookingService } from '../../Service/BookingService';
import { GuestService } from '../../Service/GuestService';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { UserProfile } from '../../Model/userProfile/userProfile';
import { ApiServiceRepo } from '../../Repository/resort_repository';



@Component({
  selector: 'app-resort-rooms',
  templateUrl: './resort-rooms.component.html',
  styleUrls: ['./resort-rooms.component.scss']
})

export class ResortRoomsComponent implements OnInit {
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

  bookedRooms: { [key: string]: { count: number, name: string, description: string, number_of_rooms: number } } = {};
  Resort_id!: number;
  Room_id!: number;

  Room_details: any[] = [];
  employee_user_ids: string = '';

  roomTypes_Req:any[]=[]
  bookedRoomsArray:any[]=[]
  booking_id!:number;

  roomid!:number; 
  roomcount!:number;

  constructor(private repository:ApiServiceRepo,private session: SessionServiceService, private route: ActivatedRoute, private dateService: DateService, private bookingService: BookingService, private guestService: GuestService, private httpclient: HttpClient, private router: Router, private routing: ActivatedRoute) { }
  check_in_date!: Date;
  check_out_date!: Date;
  bookingIdFromRoom!:number;
  

  ngOnInit(): void {
debugger;
    this.route.queryParams.subscribe(params => {
      this.Resort_id = params['ID'];
      this.booking_id =params['BookingId'];
      this.roomid =params ['room_id'];
      this.roomcount =params['room_count']
      this.bookingIdFromRoom =params['bookingIdFromRoom']


      this.getResortDetails();
    });
    this.user_id = this.session.getUserId();
    this.initializer()
    this.getEmployeeIds();
    this.calculateDayAndNight();
  }

  getResortDetails() {
    debugger;
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
              description: category.description
            });

          });
        },

      );
  }

  initializer() {
    this.check_in_date = this.dateService.checkInDate;
    this.check_out_date = this.dateService.checkOutDate;
    this.total_guest = this.guestService.getGuests();
    this.total_employees = this.guestService.getEmployee();
    this.total_list = this.total_guest.concat(this.total_employees)
    this.employee_count = this.total_employees.length;
    this.guest_count = this.total_guest.length;
    this.total_count = this.employee_count + this.guest_count;
  }

  getEmployeeIds() {
    this.total_employees.forEach((employee: { user_id: { toString: () => string; }; }, index: number) => {
      this.employee_user_ids += employee.user_id.toString();
      if (index < this.total_employees.length - 1) {
        this.employee_user_ids += ",";
      }
    });
  }


increment(room_type_id: number, name: string, description: string, number_of_rooms: number) {
    if (!this.bookedRooms[room_type_id]) {
      this.bookedRooms[room_type_id] = { count: 0, name: name, description: description, number_of_rooms: number_of_rooms };
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
    
    debugger;
    if(this.booking_id){
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
      const updatebooking={
        resort_id: this.Resort_id,
        check_in_date: this.check_in_date,
        check_out_date: this.check_out_date,
        roomTypes_Req: this.roomTypes_Req
      }
      this.bookingService.UpdatedBooking(updatebooking);
      this.router.navigate(['/user/update-booking'], { queryParams: { updatedvalues: updatebooking,id:this.booking_id } });

    }
    else if(this.roomid){
      debugger;
      this.bookedRoomsArray = Object.entries(this.bookedRooms).map(([key, value]) => ({
        room_type_id: key,
        room_type_count: value.count,
        name: value.name,
        description: value.description
      }));
      const updatedroom={
        resort_id: this.Resort_id,
        roomTypes_Req: this.bookedRoomsArray
      }
      debugger;
      this.bookingService.Updatedrooms(updatedroom);
      debugger;
      this.router.navigate(['/user/update-booking'], { queryParams: { id: this.bookingIdFromRoom } });
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



  removeMember(user_id: number, type: string) {
    debugger;
    let indexToRemove: number = -1;
    
    if (type === 'Employee') {
        indexToRemove = this.total_employees.findIndex((member: UserProfile) => member.user_id === user_id);
        if (indexToRemove !== -1) {
            this.total_employees.splice(indexToRemove, 1);
            this.employee_count--;
        }
    } else if (type === 'Guest') {
        indexToRemove = this.total_guest.findIndex((member: any) => member.guest_id === user_id);
        if (indexToRemove !== -1) {
            this.total_guest.splice(indexToRemove, 1);
            this.guest_count--;
            this.initializer();
        }
    }

    if (type === 'Employee' || type === 'Guest') {
        const listIndex = this.total_list.findIndex((member: UserProfile) => member.user_id === user_id);
        if (listIndex !== -1) {
            this.total_list.splice(listIndex, 1);
            this.total_count--;
        }
    }
}


  

  editGuest(guest_id: number) {
    debugger;
    const index=this.total_list.findIndex((member:any)=>member.guest_id===guest_id);
    this.total_list.splice(index,1);
    this.router.navigate(['/user/Addguest'], { queryParams: { id:guest_id } });
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

  getInitials(firstName: string, lastName: string, username: string, guest: any): { initials: string, backgroundColor: string } {
    if (!guest.color) {
      const colors = ['orange', 'green', 'blue', 'red'];
      const chosenColor = Math.floor(Math.random() * colors.length);
      guest.color = colors[chosenColor];
    }
  
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
  
    return { initials: initials.toUpperCase(), backgroundColor: guest.color };
  }
  



}
