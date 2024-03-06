import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiServiceRepo } from '../../Repository/resort_repository';
import { apiLoginService } from '../../Repository/login_repository';

@Component({
  selector: 'app-resort-signup',
  templateUrl: './resort-signup.component.html',
  styleUrls: ['./resort-signup.component.scss']
})
export class ResortSignupComponent implements OnInit {

  newuser = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    claySys_email: new FormControl(),
    phone_number: new FormControl(),
    address: new FormControl(),
    role: new FormControl(),
    lead: new FormControl(),
    employee_id: new FormControl(),
    age: new FormControl(),
    gender: new FormControl(),
    official_id_card_no: new FormControl(),
    official_id_image_url: new FormControl(),
    claysys_id_card_image_url: new FormControl(),
    allotted_stays:new FormControl(0),
    used_stays:new FormControl(0),
    status:new FormControl('active'),
    username: new FormControl()
  });

  constructor(private http: HttpClient,private repository:apiLoginService) {}

  ngOnInit() {}

  register() {
    const formData = this.newuser.value; 
    console.log(formData); 
  
    this.repository.signin(formData).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Error occurred during registration:', error);
      }
    );
  
    this.newuser.reset(); 
  }
  

}
