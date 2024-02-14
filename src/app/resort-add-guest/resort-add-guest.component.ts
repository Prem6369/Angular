import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-resort-add-guest',
  templateUrl: './resort-add-guest.component.html',
  styleUrl: './resort-add-guest.component.scss'
})
export class ResortAddGuestComponent {

  constructor(private router:Router){}
  BackToResort() {
    this.router.navigate(['']);
  }
}
