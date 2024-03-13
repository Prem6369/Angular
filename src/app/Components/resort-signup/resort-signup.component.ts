import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { apiLoginService } from '../../Repository/login_repository';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resort-signup',
  templateUrl: './resort-signup.component.html',
  styleUrls: ['./resort-signup.component.scss']
})
export class ResortSignupComponent implements OnInit {

  newuser = new FormGroup({
    first_name: new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    last_name: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    claySys_email: new FormControl(null,[Validators.required,Validators.email]),
    phone_number: new FormControl(null,[Validators.required,Validators.pattern('^[\\d]{10}$')]),
    address: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z\\d]+$')]),
    role: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    lead: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$')]),
    employee_id: new FormControl(null,[Validators.required,Validators.maxLength(3),Validators.pattern('^[a-zA-Z\\d]+$')]),
    age: new FormControl(null,[Validators.required,Validators.maxLength(3)]),
    gender: new FormControl(null,Validators.required),
    official_id_card_no: new FormControl(null,[Validators.required,Validators.maxLength(4),Validators.pattern('^[a-zA-Z\\d]+$')]),
    official_id_image_url: new FormControl(null,Validators.required),
    claysys_id_card_image_url: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z\\d]+$')]),
    allotted_stays:new FormControl(),
    used_stays:new FormControl(),
    status:new FormControl(''),
    username: new FormControl(null,[Validators.required,Validators.pattern('^[a-zA-Z]+$')])
  });

  constructor(private repository:apiLoginService,
    private router:Router) {}

  ngOnInit() {}

  register() {
    debugger;
    if(this.newuser.valid){
    this.setValues();
    const formData = this.newuser.value; 
  
    this.repository.signup(formData).subscribe(
      (response) => {
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

  get firstname(){
    return this.newuser.get('first_name')
  }
}
