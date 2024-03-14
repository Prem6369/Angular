import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortService } from '../../Service/resort_details';
import { admin_resort_repository } from '../../Repository/admin_resort_repository';
import { approver_repository } from '../../Repository/approver_repository';

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
    private repo: admin_resort_repository,
     private _location: Location,
      private router: Router,
      private route:ActivatedRoute,
      private approver_repo:approver_repository) {
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
    const decrptyId=Number(atob(this.Resort_id.toString()))
    this.approver_repo.getResortDetails(decrptyId)
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
    name: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]),
    description: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]),
    location: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$')]),
    coordinates: new FormControl(),
    image_urls: new FormControl(null,Validators.required),
    video_urls: new FormControl(null,Validators.required),
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
    this.repo.getAllRoom().subscribe(
      (response) => {
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
      }
    } else {
      alert("Provide room count");
    }
  }


  save() {
    if(this.AddResort.valid)
    {
      this.setValues();
      const resort_details = {
        resort_id: this.Resort_id ? Number(atob(this.Resort_id.toString())) || 0 : 0,      
        name: this.AddResort.value.name || '',
        description: this.AddResort.value.description || '',
        location: this.AddResort.value.location || '',
        amenities: this.AddResort.value.amenities,
        image_urls: this.AddResort.value.image_urls || '',
        video_urls: this.AddResort.value.video_urls || '',
        status: this.AddResort.value.status,
        categories: this.AddResort.value.categories,
        coordinates: this.AddResort.value.coordinates
      };
      this.resortService.addResort(resort_details);
      this.router.navigate(['/admin/resort-details-preview']);
    }
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

  get Name(){
    return this.AddResort.get('name');
  }

  get Description(){
    return this.AddResort.get('description');
  }

  get Location(){
    return this.AddResort.get('location');
  }

  get Image(){
    return this.AddResort.get('image_urls');
  }

  get Video(){
    return this.AddResort.get('video_urls');
  }
}
