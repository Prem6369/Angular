import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../../Model/userProfile/userProfile'; 
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { approver_repository } from '../../Repository/approver_repository';

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
  constructor(private repo: approver_repository,
    private router: Router, 
    private session: SessionServiceService) {}

  ngOnInit(): void {
    this.getUserProfile();
  }

  
  getUserProfile() {

    this.user_id = this.session.getUserId();
    this.username = this.session.getUserName();
    this.repo.getUserProfile(this.user_id).subscribe((response) => {
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
