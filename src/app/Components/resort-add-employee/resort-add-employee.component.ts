import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Location } from '@angular/common';
import { GuestService } from '../../Service/GuestService';

@Component({
  selector: 'app-resort-add-employee',
  templateUrl: './resort-add-employee.component.html',
  styleUrl: './resort-add-employee.component.scss'
})

export class ResortAddEmployeeComponent {
 employeeList:any[]=[];
 employee:any[]=[];

  employees=new FormGroup({
    name:new FormControl(''),
    Phonenumber:new FormControl(''),
    type:new FormControl('')
  })

  filteredOptions: Observable<string[]>;

  employedetails=["Alice","Aravind", "Benjamin", "Clara", "Elango", "Felix", "Katherine",  "Peter","Prem", "Quinn", "Rachel","Senthil", "Samuel", "Taylor", "Uma", "Victor", "Willow", "Xavier", "Yara", "Zachary"]

  constructor(private _location: Location,private guestService:GuestService) {
    this.filteredOptions = (this.employees.get('name')?.valueChanges as Observable<string>).pipe(
      startWith(''),
      map(value => value ? this._filter(value) : [])
    );
    
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.employedetails.filter(option => option.toLowerCase().includes(filterValue));
  }
 
  addEmployee() {
    this.setValues()
    this.employee.push(this.employees.value);
    this.employeeList.push(this.employees.value);
   // console.log("From add button:",this.employeeList);
    this.employees.reset();
  }
  
  getRandomNumber(): string {
    const phoneNumber = '9' + Math.floor(100000000 + Math.random() * 900000000).toString(); 
    return phoneNumber;
  }
//   removeEmployee(name: string) {
//     this.employee = this.employee.filter(emp => emp.name !== name);
// }
removeEmployee(name: string): void {
  const indexToRemove: number = this.employeeList.findIndex((emp: any) => emp.name === name);
  const Remove: number = this.employee.findIndex((emp: any) => emp.name === name);

  if (indexToRemove !== -1 && Remove!==-1) {
    this.employeeList.splice(indexToRemove, 1);
    this.employee.splice(indexToRemove, 1);
    console.log("deleted")
  }
}



  save() {
    this.guestService.addEmployee(this.employeeList);
    //console.log("From save button:",this.employeeList);
    this._location.back();
  }

  setValues()
  {
    this.employees.controls['type'].setValue("Employee");
    this.employees.controls['Phonenumber'].setValue(this.getRandomNumber());
  }
  
}

