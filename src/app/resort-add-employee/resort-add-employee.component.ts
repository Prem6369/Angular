import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resort-add-employee',
  templateUrl: './resort-add-employee.component.html',
  styleUrl: './resort-add-employee.component.scss'
})
export class ResortAddEmployeeComponent {

  constructor(private router:Router){}

  BackToResort() {
    this.router.navigate(['']);
  }
}
