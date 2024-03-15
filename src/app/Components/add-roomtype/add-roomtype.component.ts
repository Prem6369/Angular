import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { admin_resort_repository } from '../../Repository/admin_resort_repository';
import { ResortService } from '../../Service/resort_details';

@Component({
  selector: 'app-add-roomtype',
  templateUrl: './add-roomtype.component.html',
  styleUrls: ['./add-roomtype.component.scss']
})
export class AddRoomtypeComponent implements OnInit {
  roomsTypes: any;
  successMessage: boolean = false;
  updateMessage: boolean = false;

  roomId!: number;
  rooms:any

  constructor(
    private repo: admin_resort_repository,
    private _location: Location,
    private route: ActivatedRoute,
    private resortRoom:ResortService
  ) { }

  ngOnInit(): void {
   this.roomsTypes= this.resortRoom.getRoom();
   console.log("roomsTypes",this.roomsTypes)

   this.AddRooms.patchValue(
    {
      room_type_id:this.roomsTypes.room_type_id,
      name: this.roomsTypes.name,
      capacity:this.roomsTypes.capacity,
      description:this.roomsTypes.description
    }
   )
   

  }

  AddRooms = new FormGroup({
    room_type_id: new FormControl(),
    name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$')]),
    capacity: new FormControl(Validators.required, [Validators.maxLength(4),Validators.pattern('^[0-9]+( [0-9]+)*$')]),
    description: new FormControl('', [Validators.required])
  });

  saveRoom() {
    debugger;
    if (this.AddRooms.value.room_type_id) {
        this.repo.updateRoom(this.AddRooms.value)
        .subscribe(response => {
          if (response !== null) {
            this.updateMessage = true;
            this.AddRooms.reset();
          }

        });
    } else {
      this.repo.insertRoom(this.AddRooms.value)
        .subscribe(response => {
          if (response !== null) {
          this.successMessage = true;
          this.AddRooms.reset();
        }
        });
    }
  }


  back() {
    this._location.back();
  }

  get roomname(){
    return this.AddRooms.get('name')
  }
  get capacity(){
    return this.AddRooms.get('capacity')
  }
  get description(){
    return this.AddRooms.get('description')
  }
}
