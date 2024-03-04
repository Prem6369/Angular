import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortService } from '../../Service/resort_details';
import { Resort } from '../../Model/ResortDetails/resortDetails';

@Component({
  selector: 'app-insert-resort-details',
  templateUrl: './insert-resort-details.component.html',
  styleUrl: './insert-resort-details.component.scss'
})
export class InsertResortDetailsComponent implements OnInit {

  roomsTypes!: any;
  coordinates!: any;
  resort_rooms: any[] = [];
  Resort_id!:number;


  amenities_list = ['Beach'];


  constructor(private resortService: ResortService, 
    private httpClient: HttpClient,
     private _location: Location,
      private router: Router,
      private route:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Resort_id= params['ID'];
      this.getResortDetails();
    });
    this.getRoomTypes();
    this.initializers();
    
  }

  
  getResortDetails() {
    debugger;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const decrptyId=(atob(this.Resort_id.toString()))
    const params=new HttpParams().set('resort_id',decrptyId)

    this.httpClient.get<Resort>(`https://localhost:7036/api/resorts/getresortdetails`, { headers,params })
      .subscribe((response) => {
        console.log("Responce by ID :",response);
          this.amenities_list=response.amenities;
          this.resort_rooms=response.categories;
          this.resort_rooms.forEach(room => {
            room.availability = 'string'; 
        });
        

          const coordinatesObject = response.coordinates;

          this.AddResort.patchValue({
            name:response.name,
            description:response.description,
            location:response.location,
            image_urls:response.image_urls,
            video_urls:response.video_urls,
            status:response.status,
            coordinates: `${coordinatesObject.lat},${coordinatesObject.long}`,
          })

        });
        console.log("Value for update:",this.AddResort.value)
      }
  
  AddResort = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    location: new FormControl(),
    coordinates: new FormControl(),
    image_urls: new FormControl(),
    video_urls: new FormControl(),
    amenities: new FormControl(),
    categories: new FormControl(),
    status: new FormControl(),
  });


  AddRooms = new FormGroup({
    name: new FormControl(),
    room_type_id: new FormControl(),
    number_of_rooms: new FormControl(),
    availability: new FormControl("string")
  })


  initializers() {

    const value = this.resortService.getResort();
    const coordinatesObject = value.coordinates;
    const rooms = value.categories;


    this.AddResort.patchValue({
      name: value.name,
      description: value.description,
      location: value.location,
      image_urls: value.image_urls,
      video_urls: value.video_urls,
      status: value.status,
      coordinates: `${coordinatesObject.lat},${coordinatesObject.long}`,
    });
    value.amenities.forEach((element: string) => {
      this.amenities_list.push(element);
    });

    for (const room of rooms) {
      this.resort_rooms.push({
        name: room.name,
        room_type_id: room.room_type_id,
        number_of_rooms: room.number_of_rooms,
        availability: room.availability
      });
    }
  }


  selectRoomType(event: any) {
    const roomTypeId = event.target.value;
    const selectedRoom = this.roomsTypes.find((room: { room_type_id: number }) => room.room_type_id === +roomTypeId);
    if (selectedRoom) {
      this.AddRooms.patchValue({
        name: selectedRoom.name,
      });
    }
  }




  formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);
  room_type_id!: number;

  removeKeyword(amenitity: string) {
    const index = this.amenities_list.indexOf(amenitity);
    if (index >= 0) {
      this.amenities_list.splice(index, 1);
      this.announcer.announce(`removed ${amenitity}`);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.amenities_list.push(value);
    }
    event.chipInput!.clear();
  }



  getRoomTypes() {
    const url = `https://localhost:7036/api/resorts/getroomtypes`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiIyMzU1MGRmMS1hNDJmLTQ3YjUtYjcxYS1mYzJhMDg0NThmY2IiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDcyZTE1YjAtMWExYi00MjRiLWFlMGUtNDZkODRiY2QxZjg1IiwibmJmIjoxNzA5MTg0MjIzLCJleHAiOjE3MDkyNDQyMjMsImlhdCI6MTcwOTE4NDIyMywiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.OS0iCE1ZCB5LiovKEAcoqCv3bLBDDWtekDrTvWt-Eio';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpClient.get<any>(url, { headers }).
      subscribe((response) => {
        this.roomsTypes = response;
      })
  }


  saveRooms() {
    if (this.AddRooms.value.number_of_rooms !== null) {
      const existingRoom = this.resort_rooms.find(room => room.room_type_id === this.AddRooms.value.room_type_id);

      if (existingRoom) {
        alert("Room already exists!");
      } else {
        this.AddRooms.controls['availability'].setValue('string');
        this.resort_rooms.push(this.AddRooms.value);
        this.AddRooms.reset();
        console.log("Rooms:", this.resort_rooms);
      }
    } else {
      alert("Provide room count");
    }
  }


  save() {
    this.setValues();
    const resort_details = {
      resort_id:Number(atob(this.Resort_id.toString()))||0, //need to check for the parsing
      name: this.AddResort.value.name,
      description: this.AddResort.value.description,
      location: this.AddResort.value.location,
      amenities: this.AddResort.value.amenities,
      image_urls: this.AddResort.value.image_urls,
      video_urls: this.AddResort.value.video_urls,
      status: this.AddResort.value.status,
      categories: this.AddResort.value.categories,
      coordinates: this.AddResort.value.coordinates
    };
    console.log("From object:", resort_details)

    this.resortService.addResort(resort_details);
    this.router.navigate(['/admin/resort-details-preview']);
  }

  getCoordinates(): { lat: string, long: string } {
    const str = this.AddResort.value.coordinates;
    const [lat, long] = str.split(",");
    return { lat: lat.trim(), long: long.trim() };
  }


  setValues() {
    this.AddResort.controls['amenities'].setValue(this.amenities_list),
      this.AddResort.controls['categories'].setValue(this.resort_rooms),
      this.AddResort.controls['status'].setValue("Active"),
    this.AddResort.controls['coordinates'].setValue(this.getCoordinates())
  }

  back() {
    this._location.back();
  }
}
