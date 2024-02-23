import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestService } from '../../Service/GuestService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resort-add-guest',
  templateUrl: './resort-add-guest.component.html',
  styleUrls: ['./resort-add-guest.component.scss'],
})
export class ResortAddGuestComponent  {

  guestDetails:any;
  constructor(private _location: Location,private guestService: GuestService) {
  }

  Addguest = new FormGroup({
    Firstname: new FormControl(null, Validators.required),
    Lastname: new FormControl(null, Validators.required),
    Age: new FormControl(null, Validators.required),
    Sex: new FormControl(null, Validators.required),
    Phonenumber: new FormControl(null, Validators.required),
    Address: new FormControl(null, Validators.required),
    Idcardnumber: new FormControl(null, Validators.required),
    Imageurl: new FormControl(null, Validators.required),
    type: new FormControl(),
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
  }
}
