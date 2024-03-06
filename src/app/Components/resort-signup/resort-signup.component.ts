import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceRepo } from '../../Repository/resort_repository';
import { apiLoginService } from '../../Repository/login_repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resort-signup',
  templateUrl: './resort-signup.component.html',
  styleUrls: ['./resort-signup.component.scss']
})
export class ResortSignupComponent implements OnInit {

  newuser = new FormGroup({
    first_name: new FormControl(null,Validators.required),
    last_name: new FormControl(null,Validators.required),
    claySys_email: new FormControl(null,Validators.required),
    phone_number: new FormControl(null,Validators.required),
    address: new FormControl(null,Validators.required),
    role: new FormControl(null,Validators.required),
    lead: new FormControl(null,Validators.required),
    employee_id: new FormControl(null,Validators.required),
    age: new FormControl(null,Validators.required),
    gender: new FormControl(null,Validators.required),
    official_id_card_no: new FormControl(null,Validators.required),
    official_id_image_url: new FormControl(null,Validators.required),
    claysys_id_card_image_url: new FormControl(null,Validators.required),
    allotted_stays:new FormControl(),
    used_stays:new FormControl(),
    status:new FormControl(''),
    username: new FormControl(null,Validators.required)
  });

  constructor(private http: HttpClient,private repository:apiLoginService,private router:Router) {}

  ngOnInit() {}

  register() {
    debugger;
    if(this.newuser.valid){
    this.setValues();
    const formData = this.newuser.value; 
    console.log(formData); 
  
    this.repository.signup(formData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate([''])
        this.newuser.reset(); 

      },
      (error) => {
        console.error('Error occurred during registration:', error);
      }
    );
  }
  else{
    alert('Please fill the all values')
  }

  
  }
  

  setValues(){
    this.newuser.controls['allotted_stays'].setValue(0);
    this.newuser.controls['status'].setValue('active');
    this.newuser.controls['used_stays'].setValue(0);

  }

  back(){
    this.router.navigate([''])
  }
}
