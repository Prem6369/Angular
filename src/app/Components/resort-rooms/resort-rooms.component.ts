import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';
import { getRoomTypes } from '../../Model/RoomTypes/rooms';
import { DateService } from '../../Service/DateTime';
import { GuestDetails } from '../../Model/GuestDetails/guestDetails';
import { BookingService } from '../../Service/BookingService';
import { GuestService } from '../../Service/GuestService';
import { count } from 'rxjs';
import { SessionServiceService } from '../../Service/Session/session-service.service';
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



  constructor(private repository:ApiServiceRepo,private session: SessionServiceService, private route: ActivatedRoute, private dateService: DateService, private bookingService: BookingService, private guestService: GuestService, private httpclient: HttpClient, private router: Router, private routing: ActivatedRoute) { }
  check_in_date!: Date;
  check_out_date!: Date;

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.Resort_id = params['ID'];
      this.getResortDetails();
    });
    this.user_id = this.session.getUserId();
    this.initializer()
    this.getEmployeeIds();
    this.calculateDayAndNight();
    // this.getResortRoom();


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



  // getResortRoom() {
  //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
  //   const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  //   this.httpclient
  //     .get<any>(
  //       `https://localhost:7036/api/resorts/getroomtypes`,
  //       { headers }
  //     )
  //     .subscribe(
  //       (response) => {
  //         if (response) {
  //           for (const room of response) {
  //             const newResortRoom = new getRoomTypes(
  //               room.room_type_id,
  //               room.name,
  //               room.capacity,
  //               room.availability,
  //               room.description,
  //               room.room_type_count,
  //               room.created_date,
  //               room.last_modified_date
  //             );
  //             this.ResortRoom.push(newResortRoom);
  //           }
  //         } else {
  //           console.error('Empty response or response does not contain any room types.');
  //         }
  //       }
  //     );
  // }


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
    if (this.employee_count != 0 && this.totalSelectedRooms != 0) {
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
    }


  }



  removeMember(phone_number: number, type: string) {
    const elementIndex: number = this.total_list.findIndex((member: any) => member.phone_number === phone_number);

    if (elementIndex !== -1) {
      if (type === "Guest") {
        this.guest_count--;
      } else {
        this.employee_count--;
      }
      this.total_count--;
      this.total_list.splice(elementIndex, 1);
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
