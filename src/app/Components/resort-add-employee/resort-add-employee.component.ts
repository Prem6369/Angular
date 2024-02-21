import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-resort-add-employee',
  templateUrl: './resort-add-employee.component.html',
  styleUrl: './resort-add-employee.component.scss'
})
export class ResortAddEmployeeComponent {
  employeed:any[]=[]
  employees=new FormGroup({
    Empname:new FormControl,
    EmpNumber:new FormControl(''),
    EmpType:new FormControl('')
  })

  filteredOptions: Observable<string[]>;

  employedetails=["Alice","Aravind", "Benjamin", "Clara", "Elango", "Felix", "Katherine",  "Peter","Prem", "Quinn", "Rachel","Senthil", "Samuel", "Taylor", "Uma", "Victor", "Willow", "Xavier", "Yara", "Zachary"]

  constructor(private router:Router) {
    this.filteredOptions = (this.employees.get('Empname')?.valueChanges as Observable<string>).pipe(
      startWith(''),
      map(value => value ? this._filter(value) : [])
    );
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employedetails.filter(option => option.toLowerCase().includes(filterValue));
  }
  name:string=''
  addEmployee() {
    const name = this.employees.get('Empname')?.value;
    const type = 'Employee'; 
    const phoneNumber=this.getRandomNumber();
    this.employeed.push({ name, type,phoneNumber });
    console.log(this.employeed);
  }
  
  getRandomNumber(): string {
    const phoneNumber = '9' + Math.floor(100000000 + Math.random() * 900000000).toString(); 
    
    return phoneNumber;
  }
  save() {
    this.router.navigate(['/Resortrooms']);
  }
  
}

