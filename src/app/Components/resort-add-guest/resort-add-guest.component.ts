import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GuestService } from '../../core/service/GuestService';
import { Location } from '@angular/common';
import { SessionServiceService } from '../../core/service/Session/session-service.service';
import { ActivatedRoute } from '@angular/router';
import { GuestDetails } from '../../core/model/GuestDetails/guestDetails';

@Component({
  selector: 'app-resort-add-guest',
  templateUrl: './resort-add-guest.component.html',
  styleUrls: ['./resort-add-guest.component.scss'],
})
export class ResortAddGuestComponent implements OnInit {

  referrer_user_id!: number;
  guestDetails: any;
  guest!: any;
  guest_user_id!: number;
  booking_id!:number;
  update_guest:any[]=[];

  constructor(private session: SessionServiceService,
    private _location: Location,
    private guestService: GuestService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.referrer_user_id = this.session.getUserId();
    this.guest = this.guestService.getGuests();

    this.route.queryParams.subscribe((params) => {
      debugger;
      this.guest_user_id = +params['id'];
      this.booking_id = +params['booking_id'];

      if (this.guest_user_id) {
        this.guestDetails = this.getValuesById(this.guest_user_id);
        this.Addguest.patchValue({
          guest_user_id: this.guest_user_id,
          first_name: this.guestDetails.first_name,
          last_name: this.guestDetails.last_name,
          email: this.guestDetails.email,
          age: this.guestDetails.age,
          gender: this.guestDetails.gender,
          phone_number: this.guestDetails.phone_number,
          address: this.guestDetails.address,
          official_id_card_no: this.guestDetails.official_id_card_no,
          official_id_image_url: this.guestDetails.official_id_image_url,
          referrer_user_id: this.guestDetails.referrer_user_id
        });
         this.removeExistGuest(this.guest_user_id);
      }
    });
  }

  removeExistGuest(id:number){
      const index=this.guest.findIndex((member:any)=>member.guest_user_id===id);
      this.guest.splice(index,1);
  }


  getValuesById(guest_user_id: number): GuestDetails[] {
      const elementIndex: number = this.guest.findIndex((member: any) => member.guest_user_id === guest_user_id);
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
    guest_user_id: new FormControl(),
    first_name: new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    last_name: new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z]+$')]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    age: new FormControl(null, [Validators.required,Validators.pattern('[0-9]+$'),Validators.min(1)]),
    gender: new FormControl(null, Validators.required),
    phone_number: new FormControl(null, [Validators.required,Validators.pattern('[0-9]+$'),Validators.minLength(10)]),
    address: new FormControl(null, Validators.required),
    official_id_card_no: new FormControl(null, Validators.required),
    official_id_image_url: new FormControl(null, Validators.required),
    referrer_user_id: new FormControl()
  });



  saveNew() {
    if (this.Addguest.valid) {
      if (!this.booking_id) {
        this.setType();
        this.guestDetails = this.Addguest.value;
        this.guestService.addGuest(this.guestDetails);
        this.Addguest.reset();
      } else {
        this.update_guest.push(this.Addguest.value); 
        this.guestService.addUpdateGuest(this.update_guest); 
        this.Addguest.reset();
      }
    } else {
      alert("Please fill all fields");
    }
  }
  
  save() {
    if (this.Addguest.valid) {
      if (!this.booking_id) {
        this.setType();
        this.guestDetails = this.Addguest.value;
        this.guestService.addGuest(this.guestDetails);
      } else {
        this.update_guest.push(this.Addguest.value); 
        this.guestService.addUpdateGuest(this.update_guest); 
      }
    } else {
      alert("Please fill all fields");
    }
    this._location.back();
  }

  setType() {
    if(this.guest_user_id!==null && this.guest_user_id!==undefined)
    {
      this.Addguest.controls['guest_user_id'].setValue(this.getRandomInt(1000, 9999))
      this.Addguest.controls['referrer_user_id'].setValue(this.referrer_user_id)
    }
  }

  get firstName(){
    return this.Addguest.get('first_name');
  }
  get lastName(){
    return this.Addguest.get('last_name');
  }
  get Age(){
    return this.Addguest.get('age');
  }

    get Sex(){
    return this.Addguest.get('gender');
  }
  get Email(){
    return this.Addguest.get('email');
  }
  
  get PhoneNumber(){
    return this.Addguest.get('phone_number');
  }
  
  get Address(){
    return this.Addguest.get('address');
  }
  
  get OfficialIdCardNo(){
    return this.Addguest.get('official_id_card_no');
  }

  
}
