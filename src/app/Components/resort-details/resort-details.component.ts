import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';

@Component({
  selector: 'app-resort-details',
  templateUrl: './resort-details.component.html',
  styleUrls: ['./resort-details.component.scss']
})
export class ResortDetailsComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  img:string='';
  location:string=''
  name:string=''
  check_in_date!:Date;
  check_out_date!:Date;

  constructor(private httpclient: HttpClient,private router:Router,private routing:ActivatedRoute) {}

  ngOnInit(): void {
    this.getResortDetails();
    this.routing.queryParams.subscribe((parms) => {
      this.check_in_date = parms['checkInDate'];
      this.check_out_date = parms['checkOutDate'];

    });
  }

  getResortDetails() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const id = 2; // or any other valid resort ID
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    
    this.httpclient.get<any>(`https://claysysresortapi.claysys.org/api/resorts/getresortdetails?resort_id=${id}`, { headers })
      .subscribe(
        (response) => {
          console.log(response);
          // Check if response contains data
          this.img=response.image_urls;
          this.location=response.location;
          this.name=response.name;
        }
      );
  }
  booknow() {
    this.router.navigate(['/Resortrooms'], {
      queryParams: {
        checkInDate: this.check_in_date,
        checkOutDate: this.check_out_date
      }
    });
  }
  
  change(){
    this.router.navigate(['Resortlist'])
  }

}
