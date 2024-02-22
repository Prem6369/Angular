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

//    employedetails: {[key: string]: string}[] = [
//     {name: "Alice", phone: "123-456-7890"},
//     {name: "Aravind", phone: "234-567-8901"},
//     {name: "Clara", phone: "456-789-0123"},
//     {name: "Elango", phone: "567-890-1234"},
//     {name: "Felix", phone: "678-901-2345"},
//     {name: "Katherine", phone: "789-012-3456"},
//     {name: "Peter", phone: "890-123-4567"},
//     {name: "Prem", phone: "901-234-5678"},
//     {name: "Quinn", phone: "012-345-6789"},
//     {name: "Rachel", phone: "123-456-7890"},
//     {name: "Senthil", phone: "234-567-8901"},

// ];


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
     if(this.employees.value.name!==""){
      this.setValues()
      this.employee.push(this.employees.value);
      this.employeeList.push(this.employees.value);
     // console.log("From add button:",this.employeeList);
      this.employees.reset();
    }
    else{
      alert("Employee not Selected Please Select Employee");
    }

  }
  
  getRandomNumber(): string {
    const phoneNumber = '9' + Math.floor(100000000 + Math.random() * 900000000).toString(); 
    return phoneNumber;
  }

removeEmployee(Phonenumber: number) {

  const indexToRemove: number = this.employeeList.findIndex((emp: any) => emp.Phonenumber === Phonenumber);
  const Remove: number = this.employee.findIndex((emp: any) => emp.Phonenumber === Phonenumber);
  if (indexToRemove !== -1 && Remove!==-1) {
    this.employeeList.splice(indexToRemove, 1);
    this.employee.splice(indexToRemove, 1);
  }
}



  save() {
    if(this.employees.value.name!==""){

    this.guestService.addEmployee(this.employeeList);
    this._location.back();
    }else{
      alert("Employee not Selected Please Select Employee");
    }
  }

  setValues()
  {
    this.employees.controls['type'].setValue("Employee");
    this.employees.controls['Phonenumber'].setValue(this.getRandomNumber());
  }
  back(){
    this._location.back();
  }
}

