import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../Service/Model/models.service'; 

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
          if (response && response.length > 0 && response[0].username) {
            const userProfile = response[0]; // Accessing the first element of the array
            const userprofiles = new UserProfile(
              userProfile.user_id,
              userProfile.first_name,
              userProfile.last_name,
              userProfile.claySys_email,
              userProfile.phone_number,
              userProfile.address,
              userProfile.role,
              userProfile.lead,
              userProfile.employee_id,
              userProfile.age,
              userProfile.gender,
              userProfile.official_id_card_no,
              userProfile.official_id_image_url,
              userProfile.claysys_id_card_image_url,
              userProfile.allotted_stays,
              userProfile.used_stays,
              userProfile.remaining_days,
              userProfile.status,
              userProfile.username,
              userProfile.created_date,
              userProfile.last_modified_date
            );
            this.userlist.push(userprofiles);
          } else {
            console.error('Empty response or response does not contain any user profile.');
          }
        }
      );
}

  homePage() {
    this.router.navigate(['/ResortDetails']);
  }
}
