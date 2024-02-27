import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../../Model/userProfile/userProfile'; 
import { SessionServiceService } from '../../Service/Session/session-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'] // corrected styleUrl to styleUrls
})
export class UserProfileComponent implements OnInit {
  userlist: UserProfile[] = [];
  username: string = '';
  user_id!:number;
  constructor(private httpclient: HttpClient, private router: Router, private session: SessionServiceService) {}

  ngOnInit(): void {
    this.getResortDetails();
  }

  getResortDetails() {
    const sessionValues = this.session.GetSessionvalues();
    this.user_id = sessionValues[0];
    this.username = sessionValues[1];

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const params = new HttpParams().set('user_id',this.user_id);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpclient
      .get<any>(
        `https://localhost:7036/api/resorts/userprofile`,
        { headers, params }
      )
      .subscribe(
        (response) => {
          console.log('profile',response);
          const userprofiles = new UserProfile(
            response.user_id, 
            response.first_name,
            response.last_name,
            response.claySys_email,
            response.phone_number,
            response.address,
            response.role,
            response.lead,
            response.employee_id,
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
          this.userlist.push(userprofiles);
        },
        (error) => {
          console.error('Error fetching user details:', error);
          // Handle error (e.g., show error message to the user)
        }
      );
  }

  homePage() {
    this.router.navigate(['/ResortDetails']);
  }

  Logout() {
    this.router.navigate(['']);
  }
}
