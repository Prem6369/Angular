import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addRoomTypes } from '../../Model/RoomTypes/rooms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-roomtype',
  templateUrl: './add-roomtype.component.html',
  styleUrl: './add-roomtype.component.scss'
})
export class AddRoomtypeComponent implements OnInit {
roomsTypes:any;
successMessage:boolean=false;

constructor(private httpClient:HttpClient,private _location:Location) {
}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  AddRooms = new FormGroup({
    name: new FormControl('', Validators.required),
    capacity: new FormControl(),
    description: new FormControl('',Validators.required)
  });
  


  saveRoom()
  {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiIyMzU1MGRmMS1hNDJmLTQ3YjUtYjcxYS1mYzJhMDg0NThmY2IiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDcyZTE1YjAtMWExYi00MjRiLWFlMGUtNDZkODRiY2QxZjg1IiwibmJmIjoxNzA5MTg0MjIzLCJleHAiOjE3MDkyNDQyMjMsImlhdCI6MTcwOTE4NDIyMywiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.OS0iCE1ZCB5LiovKEAcoqCv3bLBDDWtekDrTvWt-Eio';

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
     
      const url=`https://localhost:7036/api/resorts/addroomtype`;

      this.httpClient.post<any>(url,this.AddRooms.value,{headers}).subscribe
      ((response)=>
      {
        if(response.room_type_id!==null)
        {
          console.log("Room added:",response);
          this.successMessage=true;
          this.AddRooms.reset();
        }
      
      })
  }

  back()
  {
    this._location.back();
  }
}
