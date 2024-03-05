import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-roomtype',
  templateUrl: './add-roomtype.component.html',
  styleUrls: ['./add-roomtype.component.scss']
})
export class AddRoomtypeComponent implements OnInit {
  roomsTypes: any;
  successMessage: boolean = false;
  updateMessage: boolean = false;

  roomId:number=0;

  constructor(
    private httpClient: HttpClient,
    private _location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roomId=params['room_type_id'];
      if (params && Object.keys(params).length !== 0) {
        this.AddRooms.patchValue({
          ['name']: params['name'],
          ['capacity']: params['capacity'],
          ['description']: params['description']
        });
      }
    });
    this.AddRooms.patchValue({
      room_type_id:this.roomId
    })

  }

  AddRooms = new FormGroup({
    room_type_id:new FormControl(),
    name: new FormControl('', Validators.required),
    capacity: new FormControl(),
    description: new FormControl('', Validators.required)
  });

  saveRoom() {
 
  debugger;
    if (this.roomId!==0 &&this.roomId!==undefined) {
      debugger;
      var url = 'https://localhost:7036/api/resorts/updateroomtype';
      const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiIyMzU1MGRmMS1hNDJmLTQ3YjUtYjcxYS1mYzJhMDg0NThmY2IiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDcyZTE1YjAtMWExYi00MjRiLWFlMGUtNDZkODRiY2QxZjg1IiwibmJmIjoxNzA5MTg0MjIzLCJleHAiOjE3MDkyNDQyMjMsImlhdCI6MTcwOTE4NDIyMywiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.OS0iCE1ZCB5LiovKEAcoqCv3bLBDDWtekDrTvWt-Eio';
      
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  debugger;
  console.log(this.AddRooms.value)
  console.log(this.AddRooms.value)

    this.httpClient
      .put<any>(url, this.AddRooms.value, { headers })
      .subscribe(response => {
          console.log('Room status:', response);
          this.updateMessage = true;
          this.AddRooms.reset();
        
      });

    } else {
      var url = 'https://localhost:7036/api/resorts/addroomtype';
      const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiIyMzU1MGRmMS1hNDJmLTQ3YjUtYjcxYS1mYzJhMDg0NThmY2IiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDcyZTE1YjAtMWExYi00MjRiLWFlMGUtNDZkODRiY2QxZjg1IiwibmJmIjoxNzA5MTg0MjIzLCJleHAiOjE3MDkyNDQyMjMsImlhdCI6MTcwOTE4NDIyMywiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.OS0iCE1ZCB5LiovKEAcoqCv3bLBDDWtekDrTvWt-Eio';
  
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  debugger;
    this.httpClient
      .post<any>(url, this.AddRooms.value, { headers })
      .subscribe(response => {
        if (response.room_type_id !== null) {
          console.log('Room status:', response);
          this.successMessage = true;
          this.AddRooms.reset();
        }
      });
    }
  
  

  }
  

  back() {
    this._location.back();
  }
}
