import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private guests: any[] = [];
  private employees: any[] = [];

  constructor() { }

  getGuests(): any[] {
    return this.guests;
  }

  addGuest(guest: any) {
    this.guests.push(guest);
  }

  addEmployee(employeeList: any) {
    this.employees=employeeList;
  }

  getEmployee(): any[]{
    return this.employees;
  }

  addUpdateGuest(guest: any[]) {
    this.guests.push(...guest);
  }
  
 resetService()
  {
    this.employees.splice(0);
    this.guests.splice(0);
  }

}
