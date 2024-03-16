import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserProfile } from '../../../../../../core/model/userProfile/userProfile';
import { SessionServiceService } from '../../../../../../core/service/Session/session-service.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss'
})

export class AdminHeaderComponent implements OnInit {
  userlist!: UserProfile;
  username: string = '';
  user_id!:number;
  img:string='';

   
  ngOnInit(): void {
    this.getUserProfile();
  }
  constructor(private httpclient:HttpClient,private session:SessionServiceService){}

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
          this.userlist=response;
          console.log(this.userlist.claySys_email);
        },
      );
  }


}
