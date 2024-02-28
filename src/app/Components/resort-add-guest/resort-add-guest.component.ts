import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestService } from '../../Service/GuestService';
import { Location } from '@angular/common';
import { SessionServiceService } from '../../Service/Session/session-service.service';

@Component({
  selector: 'app-resort-add-guest',
  templateUrl: './resort-add-guest.component.html',
  styleUrls: ['./resort-add-guest.component.scss'],
})
export class ResortAddGuestComponent implements OnInit  {
  referrer_user_id!:number;
  guestDetails:any;
  constructor(private session:SessionServiceService,
    private _location: Location,
    private guestService: GuestService) {
  }
  ngOnInit(): void {
    this.referrer_user_id=this.session.getUserId();
  }

  Addguest = new FormGroup({
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    phone_number: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    official_id_card_no: new FormControl(null, Validators.required),
    official_id_image_url: new FormControl(null, Validators.required),
    type: new FormControl(),
    referrer_user_id:new FormControl()
  });

 
  

  saveNew() {
    console.log(this.Addguest.invalid)
    if(this.Addguest.valid){
      this.setType()
      this.guestDetails = this.Addguest.value;
      this.guestService.addGuest(this.guestDetails);
      this.Addguest.reset();
    }
    else{
      alert("please Fill All Fileds")
    }
 
  }

  save() {
    console.log(this.Addguest.valid)
    if(this.Addguest.valid){
    this.setType()
    this.guestDetails = this.Addguest.value;
    this.guestService.addGuest(this.guestDetails);
    this._location.back();
    }
    else{
      alert("please Fill All Fileds")

    }
  } 

  setType()
  {
    this.Addguest.controls['type'].setValue("Guest");
    this.Addguest.controls['referrer_user_id'].setValue(this.referrer_user_id)
  }
}
