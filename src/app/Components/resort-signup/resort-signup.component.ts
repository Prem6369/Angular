import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  register() {
    const value = this.newuser.value;
    console.log(value);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI3MDRiYzIwYy00ZTM1LTRjOTYtOTA3ZS1kY2RiYzMwN2UzOGMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDdmOTUyNjAtMmE4Zi00OTgwLWE4ODUtZjllNGFiZmE1NGFkIiwibmJmIjoxNzA5MTg5NjQxLCJleHAiOjE3MDkyNDk2NDEsImlhdCI6MTcwOTE4OTY0MSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Ffbt9fZPcZ3wGX7npqHKZ8ovp5cG86qyjoaA67XgUFQ';
    
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = 'https://localhost:7036/api/resorts/createuser';

    this.http.post(url, value, { headers}).subscribe(
      (response) => {
        console.log('Signup', response);
      }
    );
    this.newuser.reset();
  }

}
