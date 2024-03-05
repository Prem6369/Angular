import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Room {
  availability: string;
  capacity: number;
  created_date: string;
  description: string;
  last_modified_date: string;
  name: string;
  room_type_count: number;
  room_type_id:number;
}

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})


export class RoomListComponent implements OnInit {
room:Room[]=[];
  ngOnInit() {

    this.getAllRooms();

  }
  constructor(private http:HttpClient,private router:Router){}
  getAllRooms(){
    const url = `https://localhost:7036/api/resorts/getroomtypes`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiIyMzU1MGRmMS1hNDJmLTQ3YjUtYjcxYS1mYzJhMDg0NThmY2IiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDcyZTE1YjAtMWExYi00MjRiLWFlMGUtNDZkODRiY2QxZjg1IiwibmJmIjoxNzA5MTg0MjIzLCJleHAiOjE3MDkyNDQyMjMsImlhdCI6MTcwOTE4NDIyMywiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.OS0iCE1ZCB5LiovKEAcoqCv3bLBDDWtekDrTvWt-Eio';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
     
    this.http.get<Room[]>(url,{headers}).subscribe(
      (response)=>{
        console.log(response);
        this.room=response;
        console.log("id",this.room.map(room => room.room_type_id));
        console.log("count",this.room.map(room=>room.room_type_count));
      }
    )
  }

  navigate(roomTypeId: number) {
    const selectedRoom = this.room.find(room => room.room_type_id === roomTypeId);
    if (selectedRoom) {
      // Navigate to add-roomtype component and pass the selected room details as parameters
      this.router.navigate(['/admin/addroomtype'], { queryParams: selectedRoom });
    }
  }
  
}

