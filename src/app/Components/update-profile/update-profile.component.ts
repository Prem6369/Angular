import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { UserProfile } from '../../Model/userProfile/userProfile';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiUserServiceRepo } from '../../Repository/user_repository';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'] 
})
export class UpdateProfileComponent implements OnInit {
  userlist!: UserProfile;
  user_id!: number;
  successMessage:boolean=false;

  constructor(private httpclient: HttpClient,private session: SessionServiceService,
    private _location: Location,private repository:ApiUserServiceRepo) {
  }

  ngOnInit(): void {
    debugger;
    this.getUserProfile();
  }

  updateProfile = new FormGroup({
    user_id: new FormControl(),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    claySys_email: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    lead: new FormControl('', Validators.required),
    employee_id: new FormControl('', Validators.required),
    age: new FormControl(),
    gender: new FormControl('', Validators.required),
    official_id_card_no: new FormControl('', Validators.required),
    official_id_image_url: new FormControl('', Validators.required),
    claysys_id_card_image_url: new FormControl('', Validators.required),
    allotted_stays: new FormControl(),
    remaining_days: new FormControl(),
    used_stays: new FormControl(),  
    status: new FormControl('active', Validators.required),
    username: new FormControl('', Validators.required),
  });

  getUserProfile() {
     this.user_id = this.session.getUserId();

     this.repository.userProfileById(this.user_id).subscribe((response)=>{

          console.log('profile',response);
          this.userlist=response;
          this.patchFormValues();
        }
      );
  }

  patchFormValues() {
    const values = this.userlist;
    this.updateProfile.patchValue({
      user_id: this.session.getUserId(),
      first_name: values.first_name,
      last_name: values.last_name,
      claySys_email: values.claySys_email,
      phone_number: values.phone_number,
      address: values.address,
      role: values.role,
      lead: values.lead,
      employee_id: values.employee_id,
      age: values.age,
      gender: values.gender,
      official_id_card_no: values.official_id_card_no,
      official_id_image_url: values.official_id_image_url,
      claysys_id_card_image_url: values.claysys_id_card_image_url,
      allotted_stays: values.allotted_stays,
      used_stays: values.used_stays,
      remaining_days: values.remaining_days,
      status: values.status,
      username: values.username,
    });
  }

  update() {
     this.repository.updateProfile(this.updateProfile.value).subscribe(
      (response)=>{
        this.successMessage=true;
          console.log('Update status:',response);
      }
    )

  }

  back() {
    this._location.back();
  }
}
