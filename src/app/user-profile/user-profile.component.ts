import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


export class UserProfile {
  constructor(
    public user_id: number,
    public first_name: string,
    public last_name: string,
    public claySys_email: string,
    public phone_number: string,
    public address: string,
    public role: string,
    public lead: string,
    public emplyee_id: string,
    public age: string,
    public gender: string,
    public official_id_card_no: string,
    public official_id_image_url: string,
    public claysys_id_card_image_url: string,
    public allotted_stays: string,
    public used_stays: string,
    public remaining_days: string,
    public status: string,
    public username: string,
    public created_date:string,
    public last_modified_date:string
  ) {}

}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  userlist:UserProfile[]=[];
  ngOnInit(): void {
    this.getResortDetails();
  }

  constructor(private httpclient: HttpClient, private router: Router) {}

  getResortDetails() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const username = 'aravind';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpclient
      .get<any>(
        `https://claysysresortapi.claysys.org/api/resorts/getuserdetails?username=${username}`,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response && response.resort_id) {
            const newResortDetails = new UserProfile(
              response.user_id,
              response.first_name,
              response.last_name,
              response.claySys_email,
              response.phone_number,
              response.address,
              response.role,
              response.lead,
              response.emplyee_id,
              response.age,
              response.gender,
              response.official_id_card_no,
              response.official_id_image_url,
              response.claysys_id_card_image_url,
              response.allotted_stays,
              response.used_stays,
              response.remaining_days,
              response.status,
              response.username,
              response.created_date,
              response.last_modified_date
            );
            this.userlist.push(newResortDetails);
          } else {
            console.error(
              'Empty response or response does not contain any resorts.'
            );
          }
        });

}}
