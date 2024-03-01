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
  this.resort=this.resortService.getResort()
    this.amenities=this.resort.amenities;
    this.coordinates=this.resort.coordinates;
    this.categories=this.resort.categories;
  }

  back()
  {
    this._location.back();
  }

  save()
  {
    const url= `https://localhost:7036/api/resorts/insertresortdetails`;

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI0ZGYyZTNiZi05NWY1LTQ5M2YtOGJjOC01ZDBkOWUxOWJiYTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMWI4NTFjNjAtZWQxNy00ZGU2LWI2OTItYzEzNTdjZjQzMWZiIiwibmJmIjoxNzA5MjY4NzA0LCJleHAiOjE3MDkzMjg3MDQsImlhdCI6MTcwOTI2ODcwNCwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.T3h_UW0L6aY6nJe42VgVtykMw3SuokzAVdLZlFULWJ8';

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);


    this.httpclint.post<any>(url,this.resort,{headers}).
    subscribe((response)=>
    {
      console.log("Resort post method status:",response);
      if(response.resort_id!==0)
      {
        alert("Resort added successfully");
        this.resortService.resetService();
      }
    }
    )
  }
}
