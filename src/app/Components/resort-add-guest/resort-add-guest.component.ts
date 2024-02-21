
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GuestService } from '../../Service/GuestService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resort-add-guest',
  templateUrl: './resort-add-guest.component.html',
  styleUrls: ['./resort-add-guest.component.scss'],
})
export class ResortAddGuestComponent {
  guests: any[] = [];
  guestDetails:any;
  constructor(private _location: Location,private router: Router,private guestService: GuestService) {
    this.Addguest.patchValue({
      type:"Guest"
    })
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
    debugger;
    this.guestDetails = this.Addguest.value;
    this.guestService.addGuest(this.guestDetails);
    this.Addguest.reset();
    this.Addguest.controls['type'].setValue('Guest');
  }

  save() {
    debugger;
    this.guestDetails = this.Addguest.value;
    this.guestService.addGuest(this.guestDetails);
    this._location.back();
  }
}
