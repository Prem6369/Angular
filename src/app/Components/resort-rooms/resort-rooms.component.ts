import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';  
import { getRoomTypes } from '../../Model/RoomTypes/rooms';
import { DateService } from '../../Service/DateTime';


@Component({
  selector: 'app-resort-rooms',
  templateUrl: './resort-rooms.component.html',
  styleUrls: ['./resort-rooms.component.scss']
})

export class ResortRoomsComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  ResortRoom:getRoomTypes[]=[]
  img: string = '';
  totalSelectedRooms!: number;
  
  location: string = '';
  resortname: string = '';

  total_members: { name: string;profile:string;contact: number,type:string;icon:string }[] = [
    { name: 'Samual James', contact: 1234567890 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Employee'},
    { name: 'Santhra Philip', contact: 78945612320 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Guest'},
    { name: 'Henry Fuller', contact: 5874123690 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Guest'}
  ];

  selectedRooms: { name: string; count: number }[] = [];

  constructor(private httpclient: HttpClient, private router: Router,private routing:ActivatedRoute,private dateService:DateService) {}
  check_in_date!:Date;
  check_out_date!:Date;

  ngOnInit(): void {
    this.getResortDetails();
    this.check_in_date = this.dateService.checkInDate;
    this.check_out_date = this.dateService.checkOutDate;
    this.calculateDayAndNight();
    this.getResortRoom();
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



  roomCounts: {[key: string]: number} = {};

  increment(room_type_id: number) {
    if (!this.roomCounts[room_type_id]) {
      this.roomCounts[room_type_id] = 0;
    }
    this.roomCounts[room_type_id]++;
    this.updateSelectedRooms();
  }

  decrement(room_type_id: number) {
    if (this.roomCounts[room_type_id] && this.roomCounts[room_type_id] > 0) {
      this.roomCounts[room_type_id]--;
      this.updateSelectedRooms();
    }
  }



  updateSelectedRooms() {
    this.totalSelectedRooms = Object.values(this.roomCounts).reduce((total, count) => total + count, 0);
  }
  

  BackToResort(){
    this.router.navigate(['/ResortDetails']);
  }

  next() {
    var booking_details={
      totalSelectedRooms: this.totalSelectedRooms,
      check_in_date:this.check_in_date,
      check_out_date:this.check_out_date,
      days:this.totalDays,
      nights:this.totalNights,
      roomCounts:this.roomCounts
    }
    this.router.navigate(['/booking-preview'], {
      queryParams:booking_details
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
