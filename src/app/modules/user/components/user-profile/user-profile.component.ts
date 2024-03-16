import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../../../../core/model/userProfile/userProfile'; 
import { SessionServiceService } from '../../../../core/service/Session/session-service.service';
import { ApiUserServiceRepo } from '../../../../core/repository/user_repository';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'] 
})
export class UserProfileComponent implements OnInit {
  userlist!: UserProfile;
  username: string = '';
  user_id!:number;
  img:string='';
  constructor(
    private router: Router, 
    private session: SessionServiceService,private repository:ApiUserServiceRepo) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile() {
    const sessionValues = this.session.GetSessionvalues();
    this.user_id = sessionValues[0];
    this.username = sessionValues[1];

    this.repository.userProfileById(this.user_id).subscribe((response)=>{
      this.img=response.official_id_image_url;
      console.log('profile',response);
      this.userlist=response;
    })
    
  }

  homePage() {
    this.router.navigate(['/ResortDetails']);
  }

  Logout() {
    this.session.logout();
   
  }
}
