import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuestService } from '../../Service/GuestService';

@Component({
  selector: 'app-resort-thankyou',
  templateUrl: './resort-thankyou.component.html',
  styleUrl: './resort-thankyou.component.scss'
})
export class ResortThankyouComponent implements OnInit {

constructor(private router:Router,private guestService: GuestService,){}
ngOnInit(): void {
 // 
}
GoToHome(){
  this.guestService.resetService();
  this.router.navigate(['']);
}

}
