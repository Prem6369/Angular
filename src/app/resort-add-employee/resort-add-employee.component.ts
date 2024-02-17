import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resort-add-employee',
  templateUrl: './resort-add-employee.component.html',
  styleUrl: './resort-add-employee.component.scss'
})
export class ResortAddEmployeeComponent {

  constructor(private router:Router){}

  searchEmployeeForm = new FormGroup(
    {
      employeeName : new FormControl(''),
    });
    
    searchEmployee()
    {

    }
    save() {
    this.router.navigate(['/Resortrooms']);
  }
}
