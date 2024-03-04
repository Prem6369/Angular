import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { Resort } from '../../Model/ResortDetails/resortDetails';
import { ResortService } from '../../Service/resort_details';


@Component({
  selector: 'app-resort-details-preview',
  templateUrl: './resort-details-preview.component.html',
  styleUrl: './resort-details-preview.component.scss'
})
export class ResortDetailsPreviewComponent implements OnInit {

  resort!:Resort;
  amenities:string[]=[];
  categories:any[]=[];
  coordinates:any;


  constructor(private resortService:ResortService,
    private _location:Location,
    private httpclint:HttpClient) {
    
  }
  ngOnInit(): void {
  this.resort=this.resortService.getResort();
  this.categories=this.resort.categories;
  this.amenities=this.resort.amenities;
  this.coordinates=this.resort.coordinates;
  }

  removeRoom(room_type_id:number){
    const index = this.resort.categories.findIndex(room => room.room_type_id === room_type_id);
    if (index !== -1) {
      this.resort.categories.splice(index, 1); 
      console.log("Room deleted");
    } else {
      console.error('Room not found with room_type_id:', room_type_id);
    }
  }

  back()
  {
    this._location.back();
  }

  save() {
    this.resort.categories.forEach((category: any) => {
      delete category.name;
    });

    if(this.resort.resort_id!==0)
    {
      debugger;
      const url = `https://localhost:7036/api/resorts/updateresortdetails`;

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJjMTQzMGZhZi1jODQ0LTQxYzctYWI0ZC0wMzc3NjVjYjlkMzMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiY2I4ZjQwYzYtZDYwMy00OGQ3LWFiMjYtZTYyYzI1ZGI0NWU0IiwibmJmIjoxNzA5NTI0ODI1LCJleHAiOjE3MDk1ODQ4MjUsImlhdCI6MTcwOTUyNDgyNSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.7oNcd4c30picnukJAUKv6jbXzgCcrYPuCLD3JBS84co';
  
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      this.httpclint.put<any>(url, this.resort, { headers }).
        subscribe((response) => {
          console.log("Resort post method status:", response);
          if (response) {
            alert("Resort updated successfully");
            this.resortService.resetService();
            this._location.back();
          }
        }
        )

    }
    else{
      debugger;
      const url = `https://localhost:7036/api/resorts/insertresortdetails`;

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI0ZGYyZTNiZi05NWY1LTQ5M2YtOGJjOC01ZDBkOWUxOWJiYTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMWI4NTFjNjAtZWQxNy00ZGU2LWI2OTItYzEzNTdjZjQzMWZiIiwibmJmIjoxNzA5MjY4NzA0LCJleHAiOjE3MDkzMjg3MDQsImlhdCI6MTcwOTI2ODcwNCwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.T3h_UW0L6aY6nJe42VgVtykMw3SuokzAVdLZlFULWJ8';
  
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      this.httpclint.post<any>(url, this.resort, { headers }).
        subscribe((response) => {
          console.log("Resort post method status:", response);
          if (response.resort_id !== 0) {
            alert("Resort added successfully");
            this.resortService.resetService();
            this._location.back();
          }
        }
        )
    }

  }
}
