import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestService } from '../../Service/GuestService';
import { Location } from '@angular/common';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { ActivatedRoute } from '@angular/router';
import { GuestDetails, GuestPost } from '../../Model/GuestDetails/guestDetails';

@Component({
  selector: 'app-resort-add-guest',
  templateUrl: './resort-add-guest.component.html',
  styleUrls: ['./resort-add-guest.component.scss'],
})
export class ResortAddGuestComponent implements OnInit {
  referrer_user_id!: number;
  guestDetails: any;
  guest!: any[];
  guest_id!: number;

  constructor(private session: SessionServiceService,
    private _location: Location,
    private guestService: GuestService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    debugger;
    this.referrer_user_id = this.session.getUserId();
    this.guest = this.guestService.getGuests();

    this.route.queryParams.subscribe((params) => {
      this.guest_id = +params['id'];
      if (this.guest_id) {
        this.guestDetails = this.getValuesById(this.guest_id);
        this.Addguest.patchValue({
          guest_id: this.guest_id,
          first_name: this.guestDetails.first_name,
          last_name: this.guestDetails.last_name,
          email: this.guestDetails.email,
          age: this.guestDetails.age,
          gender: this.guestDetails.gender,
          phone_number: this.guestDetails.phone_number,
          address: this.guestDetails.address,
          official_id_card_no: this.guestDetails.official_id_card_no,
          official_id_image_url: this.guestDetails.official_id_image_url,
          type: this.guestDetails.type,
          referrer_user_id: this.guestDetails.referrer_user_id
        });
      }
    });
    
  }

  getValuesById(guest_id: number): GuestDetails[] {
    debugger;
    const elementIndex: number = this.guest.findIndex((member: any) => member.guest_id === guest_id);
    if (elementIndex !== -1) {
      return this.guest[elementIndex];
    } else {
      return [];
    }
  }

   getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  Addguest = new FormGroup({
    guest_id: new FormControl(this.getRandomInt(1000, 9999)),
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
    referrer_user_id: new FormControl()
  });




  saveNew() {
    debugger
    if (this.Addguest.valid) {
      this.setType()
      this.guestDetails = this.Addguest.value;
      this.guestService.addGuest(this.guestDetails);
      this.Addguest.reset();
    }
    else {
      alert("please Fill All Fileds")
    }

  }

  save() {
    debugger;
    console.log(this.Addguest.valid)
    if (this.Addguest.valid) {
      this.setType()
      this.guestDetails = this.Addguest.value;
      this.guestService.addGuest(this.guestDetails);
      this._location.back();
    }
    else {
      alert("please Fill All Fileds")
    }
  }

  setType() {
      this.Addguest.controls['type'].setValue("Guest");
      this.Addguest.controls['referrer_user_id'].setValue(this.referrer_user_id)
  }
}
