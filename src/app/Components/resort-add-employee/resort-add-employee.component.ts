import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Location } from '@angular/common';
import { GuestService } from '../../Service/GuestService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfile } from '../../Model/userProfile/userProfile';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-resort-add-employee',
  templateUrl: './resort-add-employee.component.html',
  styleUrls: ['./resort-add-employee.component.scss']
})

export class ResortAddEmployeeComponent implements OnInit {
  employeeList: any[] = [];
  employee: any[] = [];
  userProfile: UserProfile[] = [];
  selectedUserId!: number;

  employees = new FormGroup({
    username: new FormControl(''),
    user_id: new FormControl(),
    Phonenumber: new FormControl(''),
    type: new FormControl('')
  });

  filteredOptions: Observable<UserProfile[]>;

  constructor(
    private httpClient: HttpClient,
    private _location: Location,
    private guestService: GuestService
  ) {
    this.filteredOptions = this.employees.get('username')!.valueChanges.pipe(
      startWith(''),
      map(value => value ? this._filter(value) : [])
    );
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public _filter(value: any): UserProfile[] {
    const filterValue = value;
    return this.userProfile.filter(option =>
      option.username.toLowerCase().includes(filterValue) ||
      option.user_id == filterValue
    );
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    this.employees.patchValue({
      username: event.option.value.username
    })
    this.selectedUserId = event.option.value.user_id;
  }


  addEmployee(user_id: number) {
    if (this.employees.value.username !== "") {
      this.setValues(user_id);
      this.employee.push(this.employees.value);
      this.employeeList.push(this.employees.value);
      this.employees.reset();
    } else {
      alert("Employee not Selected Please Select Employee");
    }
  }

  removeEmployee(user_id: number) {
    const indexToRemove: number = this.employeeList.findIndex((emp: UserProfile) => emp.user_id === user_id);
    const removeIndex: number = this.employee.findIndex((emp: UserProfile) => emp.user_id === user_id);
    if (indexToRemove !== -1 && removeIndex !== -1) {
      this.employeeList.splice(indexToRemove, 1);
      this.employee.splice(removeIndex, 1);
    }
  }


  save() {
    if (this.employees.value.username !== "") {
      this.guestService.addEmployee(this.employeeList);
      this._location.back();
    } else {
      alert("Employee not Selected Please Select Employee");
    }
  }

  setValues(user_id: number) {
    if (this.userProfile.length > 0) {
      const firstUserProfile = this.userProfile.find(profile => profile.user_id === user_id);
      if (firstUserProfile) {
        this.employees.controls['user_id'].setValue(user_id);
        this.employees.controls['Phonenumber'].setValue(firstUserProfile.phone_number);
        this.employees.controls['type'].setValue("Employee");
      }
    }
  }


  back() {
    this._location.back();
  }

  getUsers() {
    const url = `https://localhost:7036/api/resorts/getusers`;
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI3NTEwZDVjNy1mYTNhLTRiYzctYjEzNy1lZjc1ZmVhNWYzZjIiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMjIxNTljNmItYjY1MC00ZWFlLTg4ODMtNzRhMzgwN2QyZTg4IiwibmJmIjoxNzA4NjcxMTg1LCJleHAiOjE3MDg3MzExODUsImlhdCI6MTcwODY3MTE4NSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.D7SccInUXQRcXjY1UpMIevwkFz3WFhpUVlSuKWFkGIY';

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpClient.get<UserProfile[]>(url, { headers }).subscribe(
      (response: UserProfile[]) => {
        this.userProfile = response;
        console.log("Object", this.userProfile);
      }
    );
  }

}
