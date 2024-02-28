import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resort-signup',
  templateUrl: './resort-signup.component.html',
  styleUrl: './resort-signup.component.scss'
})
export class ResortSignupComponent {

  newuser=new FormGroup({
    first_name:new FormControl(),
    last_name:new FormControl(),
    claySys_email:new FormControl(),
    phone_number:new FormControl(),
    address:new FormControl(),
    role:new FormControl(),
    lead:new FormControl(),
    employee_id:new FormControl(),
    age:new FormControl(),
    gender:new FormControl(),
    official_id_card_no:new FormControl(),
    official_id_image_url:new FormControl(),
    claysys_id_card_image_url:new FormControl(),
    username:new FormControl()
  })
}
