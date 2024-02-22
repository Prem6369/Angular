import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    Firstname: new FormControl(),
    Lastname: new FormControl(),
    Age: new FormControl(),
    Sex: new FormControl(),
    Phonenumber: new FormControl(),
    Address: new FormControl(),
    Idcardnumber: new FormControl(),
    Imageurl: new FormControl(),
    type:new FormControl()
  });

 
  

  saveNew() {
    this.setType()
    this.guestDetails = this.Addguest.value;
    this.guestService.addGuest(this.guestDetails);
    this.Addguest.reset(); 
  }

  save() {
    this.setType()
    this.guestDetails = this.Addguest.value;
    this.guestService.addGuest(this.guestDetails);
    this._location.back();
  } 

  setType()
  {
    this.Addguest.controls['type'].setValue("Guest");
  }
}
