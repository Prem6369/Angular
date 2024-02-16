import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../Service/Model/models.service'; 

@Component({
  selector: 'app-resort-rooms',
  templateUrl: './resort-rooms.component.html',
  styleUrls: ['./resort-rooms.component.scss']
})
export class ResortRoomsComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  img: string = '';
  
  location: string = '';
  resortname: string = '';
  rooms: { name: string; value: number,icon:string }[] = [
    { name: 'Single Room', value: 0 ,icon:'fa-solid fa-bed fa-2x check'},
    { name: 'Double Room', value: 0 ,icon:'fa-solid fa-user fa-2x check'},
    { name: 'Suite Room', value: 0 ,icon:'fa-solid fa-hospital fa-2x check'}
  ];

  total_members: { name: string;profile:string;contact: number,type:string;icon:string }[] = [
    { name: 'Samual James', contact: 1234567890 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Employee'},
    { name: 'Santhra Philip', contact: 78945612320 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Guest'},
    { name: 'Henry Fuller', contact: 5874123690 ,icon:'fa-regular fa-trash-can',profile:'fa-regular fa-id-badge',type:'Guest'}
  ];

  selectedRooms: { name: string; count: number }[] = [];

  constructor(private httpclient: HttpClient, private router: Router,private routing:ActivatedRoute) {}
  check_in_date!:Date;
  check_out_date!:Date;
  ngOnInit(): void {
    this.getResortDetails();
    this.routing.queryParams.subscribe((parms) => {
      this.check_in_date = parms['checkInDate'];
      this.check_out_date = parms['checkOutDate'];

    });
    this.calculateDayAndNight();
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
          console.log(this.totalDays);
          console.log(this.totalNights);

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

  nextpage() {
    this.router.navigate(['/Thankyou']);
  }


  increment(index: number) {
    this.rooms[index].value++;
    this.updateSelectedRooms();
  }

  decrement(index: number) {
    if (this.rooms[index].value > 0) {
      this.rooms[index].value--;
      this.updateSelectedRooms();
    }
  }
  totalSelectedRooms: number = 0;

  updateSelectedRooms() {
    this.totalSelectedRooms = this.rooms.reduce((total, room) => total + room.value, 0);
  }

  BackToResort(){
    this.router.navigate(['/ResortDetails']);
  }

  next()
  {
    this.router.navigate(['/booking-preview']);
  }
totalDays!:number;
totalNights!:number;
calculateDayAndNight() {
  // Set default check-in time to 10 AM
  const checkInDateTime = new Date(this.check_in_date);
  checkInDateTime.setHours(10, 0, 0, 0);

  // Set default check-out time to 6 PM
  const checkOutDateTime = new Date(this.check_out_date);
  checkOutDateTime.setHours(18, 0, 0, 0);

  // Initialize total days and nights
  let totalDays = 0;
  let totalNights = 0;

  // Check if check-out date is after check-in date
  if (checkOutDateTime > checkInDateTime) {
    // Calculate the difference in milliseconds between the two dates
    const differenceInMs = checkOutDateTime.getTime() - checkInDateTime.getTime();

    // Convert milliseconds to days and round it down
    totalDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

    // Check if check-out time is after 6 PM
    if (checkOutDateTime.getHours() >= 18) {
      // Increment total nights by 1
      totalNights++;
    }

    // Add the total days to total nights
    totalNights += totalDays;
  }

  // Update class variables
  this.totalDays = totalDays;
  this.totalNights = totalNights;
}

}
