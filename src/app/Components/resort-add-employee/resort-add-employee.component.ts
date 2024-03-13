import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Location } from '@angular/common';
import { GuestService } from '../../Service/GuestService';
import { UserProfile } from '../../Model/userProfile/userProfile';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ApiUserServiceRepo } from '../../Repository/user_repository';

@Component({
  selector: 'app-resort-add-employee',
  templateUrl: './resort-add-employee.component.html',
  styleUrls: ['./resort-add-employee.component.scss']
})

export class ResortAddEmployeeComponent implements OnInit {
  employee: any[] = [];
  userProfile: UserProfile[] = [];
  selectedUserId!: number;

  employees = new FormGroup({
    username: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    user_id: new FormControl(),
    phone_number: new FormControl(''),
    type: new FormControl('')
  });

  filteredOptions: Observable<UserProfile[]>;

  constructor(
    private _location: Location,
    private guestService: GuestService,
    private repository: ApiUserServiceRepo
  ) {
    this.filteredOptions = this.employees.get('username')!.valueChanges.pipe(
      startWith(''),
      map(value => value ? this._filter(value) : [])
    );
  }

  ngOnInit(): void {
    this.getUsers();
    debugger;
    const storedEmployees = this.guestService.getEmployee();
    if (storedEmployees && storedEmployees.length > 0) {
      this.employee = storedEmployees;
    }
  }

  public _filter(value: any): UserProfile[] {
    const filterValue = value;
    return this.userProfile.filter(option =>
      option.username.toLowerCase().includes(filterValue) ||
      option.user_id == filterValue
    );
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
    const userInput = event.option.value;
    const optionSelected = this.userProfile.includes(userInput);
    if (!optionSelected) {
      this.employees.controls['username'].setValue('');
    }
    else {
      this.employees.patchValue({
        username: event.option.value.username
      })
      this.selectedUserId = event.option.value.user_id;
    }
  }


  addEmployee(user_id: number) {
    debugger;
    if (this.employees.value.username !== '' && user_id !== undefined) {
      const employeeExists = this.employee.some(emp => emp.user_id === user_id);
      if (!employeeExists) {
        this.setValues(user_id);
        this.employee.push(this.employees.value);
        this.employees.reset();
      } else {
        alert("Employee already added.");
      }
    } else {
      alert("Employee not selected. Please select an employee.");
    }
  }


  removeEmployee(user_id: number) {
    const removeIndex: number = this.employee.findIndex((emp: UserProfile) => emp.user_id === user_id);
    if (removeIndex !== -1) {
      this.employee.splice(removeIndex, 1);
    }
  }


  save() {
    if (this.employees.value.username !== "") {
      this.guestService.addEmployee(this.employee);
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
        this.employees.controls['phone_number'].setValue(firstUserProfile.phone_number);
        this.employees.controls['type'].setValue("Employee");
      }
    }
  }


  back() {
    this._location.back();
  }

  getUsers() {
    this.repository.getAllUsers().subscribe(
      (response: UserProfile[]) => {
        this.userProfile = response;
      }
    )

  }


  getInitials(first_name: string, last_name: string, username: string, user_id: number): { initials: string, backgroundColor: string } {
    const storedEmployee = this.employee.find(emp => emp.user_id === user_id);
    let backgroundColor = '';
    if (storedEmployee && storedEmployee.backgroundColor) {
      backgroundColor = storedEmployee.backgroundColor;
    } else {
      const colors = ['orange', 'green', 'blue', 'red'];
      const chosenColor = Math.floor(Math.random() * colors.length);
      backgroundColor = colors[chosenColor];
      if (storedEmployee) {
        storedEmployee.backgroundColor = backgroundColor;
      }
    }

    let initials = '';

    if (first_name) {
      initials += first_name.charAt(0);
    }

    if (last_name) {
      initials += last_name.charAt(0);
    }

    if (!initials && username) {
      initials += username.charAt(0);
      if (username.length > 1) {
        initials += username.charAt(1);
      }
    }

    return { initials: initials.toUpperCase(), backgroundColor };
  }
}
