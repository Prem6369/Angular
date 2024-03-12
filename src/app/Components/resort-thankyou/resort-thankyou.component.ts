import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from '../../Service/GuestService';

@Component({
  selector: 'app-resort-thankyou',
  templateUrl: './resort-thankyou.component.html',
  styleUrl: './resort-thankyou.component.scss'
})
export class ResortThankyouComponent {

  constructor(private router: Router, private guestService: GuestService,) { }

  GoToHome() {
    this.guestService.resetService();
    this.router.navigate(['/user/Home']);
  }
}
