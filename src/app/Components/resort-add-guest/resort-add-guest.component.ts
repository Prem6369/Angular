import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-resort-add-guest',
  templateUrl: './resort-add-guest.component.html',
  styleUrl: './resort-add-guest.component.scss',
})
export class ResortAddGuestComponent {
  Firstname!:string;
  Lastname!:string;
  Phonenumber!:number;
  constructor(private router: Router) {}
  BackToResort() {
    this.router.navigate(['']);
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
  });

  saveNew() {
    var guestdetils = this.Addguest.value;
    console.log(guestdetils);
    this.Addguest.reset();
  }
  save() {
    var guestdetils = this.Addguest.value;
    this.Firstname=this.Addguest.value.Firstname;
    this.Lastname=this.Addguest.value.Lastname;
    var guestname = this.Firstname+this.Lastname;
    this.Phonenumber=this.Addguest.value.Phonenumber;
    console.log(guestdetils);
    this.Addguest.reset();
    var GuestDetails={
      Guestname:guestname,

      PhoneNumber:this.Phonenumber
    }
    this.router.navigate(['/Resortrooms'],{queryParams:GuestDetails});
  }
}
