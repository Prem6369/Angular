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


  GuestDetails:{Firstname:string,Lastname:string,Age:number,Sex:string,Phonenumber:number,Address:string,Idcardnumber:string,Imageurl:string}[]=[];


  saveNew() {
    var guestdetils:any = this.Addguest.value;
    console.log(guestdetils);
    this.Addguest.reset();
    this.GuestDetails.push(guestdetils);
  }
  save() {
    var guestdetils = this.Addguest.value;
    console.log(guestdetils);
    this.router.navigate(['/Resortrooms'],{queryParams:guestdetils});
  }
}
