import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrl: './manage-booking.component.scss',
})
export class ManageBookingComponent implements OnInit {
  Bookings_list: any[] = [];
  resortId: any[] = [];
  resortname: any[] = [];
  userId: any[] = [];
  username: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI3MDRiYzIwYy00ZTM1LTRjOTYtOTA3ZS1kY2RiYzMwN2UzOGMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDdmOTUyNjAtMmE4Zi00OTgwLWE4ODUtZjllNGFiZmE1NGFkIiwibmJmIjoxNzA5MTg5NjQxLCJleHAiOjE3MDkyNDk2NDEsImlhdCI6MTcwOTE4OTY0MSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Ffbt9fZPcZ3wGX7npqHKZ8ovp5cG86qyjoaA67XgUFQ';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = 'https://localhost:7036/api/resorts/getallbooking';

    this.http.get<any>(url, { headers }).subscribe(
      (response) => {
        console.log(response);
        this.Bookings_list = response;
        this.resortId = this.Bookings_list.map((booking) => booking.resort_id);
        this.userId = this.Bookings_list.map((booking) => booking.user_id);
        this.fetchResortNames(0);
        this.getUserName(0);
      }
    );
  }
                                
  fetchResortNames(index: number) {
    if (index >= this.resortId.length) {
      this.mergeResortNames();
      return;
    }

    const resortId = this.resortId[index];
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI3MDRiYzIwYy00ZTM1LTRjOTYtOTA3ZS1kY2RiYzMwN2UzOGMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDdmOTUyNjAtMmE4Zi00OTgwLWE4ODUtZjllNGFiZmE1NGFkIiwibmJmIjoxNzA5MTg5NjQxLCJleHAiOjE3MDkyNDk2NDEsImlhdCI6MTcwOTE4OTY0MSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Ffbt9fZPcZ3wGX7npqHKZ8ovp5cG86qyjoaA67XgUFQ';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = 'https://localhost:7036/api/resorts/getresortdetails';

    const params = new HttpParams().set('resort_id', resortId.toString());

    this.http.get<any>(url, { headers, params }).subscribe((response) => {
      this.resortname.push(response.name);
      // console.log(this.resortname);

      this.fetchResortNames(index + 1);
    });
  }

  getUserName(userIndex: number) {
    if (userIndex >= this.userId.length) {
      this.mergeResortNames();
      return;
    }

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI3MDRiYzIwYy00ZTM1LTRjOTYtOTA3ZS1kY2RiYzMwN2UzOGMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDdmOTUyNjAtMmE4Zi00OTgwLWE4ODUtZjllNGFiZmE1NGFkIiwibmJmIjoxNzA5MTg5NjQxLCJleHAiOjE3MDkyNDk2NDEsImlhdCI6MTcwOTE4OTY0MSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Ffbt9fZPcZ3wGX7npqHKZ8ovp5cG86qyjoaA67XgUFQ';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const userid = this.userId[userIndex];
    const userurl = 'https://localhost:7036/api/resorts/userprofile';
    const params = new HttpParams().set('user_id', userid.toString());

    this.http.get<any>(userurl, { headers, params }).subscribe((response) => {
      console.log(response);
      this.username.push(response.username);
      this.getUserName(userIndex + 1);
    });
  }

  mergeResortNames() {
    this.Bookings_list.forEach((booking, index) => {
      booking.resort_name = this.resortname[index];
    });
    this.Bookings_list.forEach((booking, userindex) => {
      booking.username = this.username[userindex];
    });
    console.log(this.Bookings_list);
  }

  onchange($event: any, id: number,approverid:number) {
    const changestatus = $event.target.value;
    const value = {
      booking_id: id,
      approver_id: approverid, 
      status: changestatus,
      message: 'thankyou' 
    };
      const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiIyYjc1MDY0ZS1jNzJlLTQxNzUtYTU3My0zODE5OGNiNjljZTAiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiNzIzYjAyYjctOGI2Yi00ZjlmLWI3NmYtNDY3ZmFkZmI2MDc1IiwibmJmIjoxNzA5Mjg3MTk0LCJleHAiOjE3MDkzNDcxOTQsImlhdCI6MTcwOTI4NzE5NCwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Fs0UuenrSnm9_GPXcjQp4RWW06vOMYjxSmFXpbyNvOs';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url='https://localhost:7036/api/resorts/updatestatus';
    console.log(value)
    this.http
      .put(url,value,{headers})
      .subscribe(
        (response) => {
          console.log('Response:', response);
        }
      );
  }
}
