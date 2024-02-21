import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private guests: any[] = [];

  constructor() { }

  getGuests(): any[] {
    return this.guests;
  }

  addGuest(guest: any) {
    this.guests.push(guest);
  }
}
