import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortService } from '../../Service/resort_details';

@Component({
  selector: 'app-insert-resort-details',
  templateUrl: './insert-resort-details.component.html',
  styleUrl: './insert-resort-details.component.scss'
})
export class InsertResortDetailsComponent implements OnInit {

  roomsTypes!: any;
  coordinates!: any;
  resort_rooms: any[] = [];

  amenities_list = ['Beach'];


  constructor(private resortService:ResortService,private httpClient: HttpClient, private _location: Location,private router:Router) {
  }
  ngOnInit(): void {
    this.getRoomTypes();

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
    name:new FormControl(),
    room_type_id: new FormControl(),
    number_of_rooms: new FormControl(),
    availability: new FormControl("string")
  })




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
    this.resort_rooms.push(this.AddRooms.value)
    this.AddRooms.reset();
  }

  save() {
    this.setValues();
    const resort_details = {
      name: this.AddResort.value.name,
      description:this.AddResort.value.description, 
      location:this.AddResort.value.location, 
      amenities:this.AddResort.value.amenities, 
      image_urls: this.AddResort.value.image_urls, 
      video_urls: this.AddResort.value.video_urls, 
      status: this.AddResort.value.status, 
      categories: this.AddResort.value.categories, 
      coordinates:this.AddResort.value.coordinates
  };
  console.log("From object:",resort_details)

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
      this.AddRooms.controls['availability'].setValue('string')
    this.AddResort.controls['coordinates'].setValue(this.getCoordinates())
  }

}
