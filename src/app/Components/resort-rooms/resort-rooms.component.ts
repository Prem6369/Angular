import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';  
import { getRoomTypes } from '../../Model/RoomTypes/rooms';
<<<<<<< HEAD
import { DateService } from '../../Service/DateTime';
=======
import { GuestService } from '../../Service/GuestService';
import { GuestDetails } from '../../Model/GuestDetails/guestDetails';
>>>>>>> a360b93aab5a58bb2eab3e380e9b29bd1a1ad574


@Component({
  selector: 'app-resort-rooms',
  templateUrl: './resort-rooms.component.html',
  styleUrls: ['./resort-rooms.component.scss']
})

export class ResortRoomsComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  ResortRoom:getRoomTypes[]=[];
  guestDetails: GuestDetails[] = [];
  img: string = '';
  totalSelectedRooms!: number;
  
  location: string = '';
  resortname: string = '';
  total_members:any;
  total_guest!:number;
  members_count!:number;

  bookedRooms: { [key: string]: { count: number, name: string, description: string } } = {};

<<<<<<< HEAD
  selectedRooms: { name: string; count: number }[] = [];

  constructor(private httpclient: HttpClient, private router: Router,private routing:ActivatedRoute,private dateService:DateService) {}
=======
  constructor(private guestService: GuestService,private httpclient: HttpClient, private router: Router,private routing:ActivatedRoute) {}
>>>>>>> a360b93aab5a58bb2eab3e380e9b29bd1a1ad574
  check_in_date!:Date;
  check_out_date!:Date;

  ngOnInit(): void {
    this.getResortDetails();
<<<<<<< HEAD
    this.check_in_date = this.dateService.checkInDate;
    this.check_out_date = this.dateService.checkOutDate;
    this.calculateDayAndNight();
    this.getResortRoom();
=======
    this.routing.queryParams.subscribe((parms) => {
      this.check_in_date = parms['checkInDate'];
      this.check_out_date = parms['checkOutDate'];
    });
    this.guestDetails = this.guestService.getGuests();
    this.calculateDayAndNight();
    this.getResortRoom();
    this.total_members=this.guestDetails;
    this.total_guest=this.guestDetails.length;
    this.members_count=this.total_guest;
>>>>>>> a360b93aab5a58bb2eab3e380e9b29bd1a1ad574
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
        },
        (error) => {
          console.error('Error fetching resort details:', error);
        }
      );
  }


  getResortRoom() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpclient
      .get<any>(
        `https://claysysresortapi.claysys.org/api/resorts/getroomtypes`,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response) {
            // Assuming response is an array of room types
            for (const room of response) {
              const newResortRoom = new getRoomTypes(
                room.room_type_id,
                room.name,
                room.capacity,
                room.availability,
                room.description,
                room.room_type_count,
                room.created_date,
                room.last_modified_date
              ); 
              this.ResortRoom.push(newResortRoom);
            }
          } else {
            console.error('Empty response or response does not contain any room types.');
          }
          
        }
      );
  }

  nextpage() {
    this.router.navigate(['/Thankyou']);
  }




  increment(room_type_id: number, name: string, description: string) {
    if (!this.bookedRooms[room_type_id]) {
      this.bookedRooms[room_type_id] = { count: 0, name: name, description: description }; 
    }
    this.bookedRooms[room_type_id].count++;
    this.updateSelectedRooms();
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
  

  BackToResort(){
    this.router.navigate(['/ResortDetails']);
  }

  next() {
    const booking_details = {
      totalSelectedRooms: this.totalSelectedRooms,
      check_in_date: this.check_in_date,
      check_out_date: this.check_out_date,
      days: this.totalDays,
      nights: this.totalNights,
      bookedRooms: this.bookedRooms, 
      members_count: this.members_count,
      total_members: this.total_members
    };
    console.log(booking_details);

    this.router.navigate(['/booking-preview'], {
      queryParams: booking_details
    });
  }
  
totalDays!:number;
totalNights!:number;
calculateDayAndNight() {

  const checkInDateTime = new Date(this.check_in_date);
  const checkOutDateTime = new Date(this.check_out_date);

  if (checkOutDateTime > checkInDateTime) {
    const differenceInMs = checkOutDateTime.getTime() - checkInDateTime.getTime();
    this.totalDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    this.totalDays++;
    this.totalNights =this.totalDays-1;
    console.log(this.totalDays,this.totalNights);
  }
  this.totalDays = this.totalDays;
  this.totalNights = this.totalNights;
}

}
