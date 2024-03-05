import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../../Model/userProfile/userProfile'; 
import { SessionServiceService } from '../../Service/Session/session-service.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss'
})
export class AdminProfileComponent implements OnInit {

  userlist!: UserProfile;
  username: string = '';
  user_id!:number;
  img:string='';
  constructor(private httpclient: HttpClient, 
    private router: Router, 
    private session: SessionServiceService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  
  getUserProfile() {
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
          this.img=response.official_id_image_url;
          console.log('profile',response);
          this.userlist=response;
        },
      );
  }

  homePage() {
    this.router.navigate(['/admin/home']);
  }

  Logout() {
    this.session.logout();
   
  }


}
