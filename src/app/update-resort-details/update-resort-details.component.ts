import { Component, OnInit } from '@angular/core';
import { ResortDetails } from '../Model/ResortDetails/resortDetails';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-resort-details',
  templateUrl: './update-resort-details.component.html',
  styleUrl: './update-resort-details.component.scss'
})
export class UpdateResortDetailsComponent implements OnInit {

  resortlist: ResortDetails[] = [];
  Resort_id!: number;

  constructor(private httpclient: HttpClient, private router: Router) {

  }
  ngOnInit(): void {
    this.getResortDetails();

  }

  getResortDetails() {

    const url = `https://localhost:7036/api/resorts/getallresorts`;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJjMTQzMGZhZi1jODQ0LTQxYzctYWI0ZC0wMzc3NjVjYjlkMzMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiY2I4ZjQwYzYtZDYwMy00OGQ3LWFiMjYtZTYyYzI1ZGI0NWU0IiwibmJmIjoxNzA5NTI0ODI1LCJleHAiOjE3MDk1ODQ4MjUsImlhdCI6MTcwOTUyNDgyNSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.7oNcd4c30picnukJAUKv6jbXzgCcrYPuCLD3JBS84co';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpclient
      .get<any[]>(url, { headers }).
      subscribe((response) => {
        console.log(response);
        if (Array.isArray(response)) {
          response.forEach((resortObject) => {
            const newResortDetails = new ResortDetails(
              resortObject.resort_id,
              resortObject.name,
              resortObject.description,
              resortObject.location,
              resortObject.amenities,
              resortObject.image_urls,
              resortObject.video_urls,
              resortObject.status,
              resortObject.created_date,
              resortObject.last_modified_date,
              resortObject.categories,
              resortObject.coordinates
            );
            this.resortlist.push(newResortDetails);
            this.Resort_id = resortObject.resort_id

          });
        } else {
          console.error('Response is not an array.');
        }
      },
      );
  }

  nextpage(resortId: number) {

    const encryptId = (btoa(resortId.toString()))
    console.log(encryptId)
    this.router.navigate(['/admin/insert_resortdetails'], { queryParams: { ID: encryptId } });
  }

}
