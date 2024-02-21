import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resort-thankyou',
  templateUrl: './resort-thankyou.component.html',
  styleUrl: './resort-thankyou.component.scss'
})
export class ResortThankyouComponent implements OnInit {

constructor(private router:Router){}
ngOnInit(): void {
  
}
GoToHome(){
  this.router.navigate(['']);
}

}
