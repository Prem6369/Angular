import { Injectable } from "@angular/core";
import { Booking_details } from "../Model/bookingDetails";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookings!:Booking_details;

  constructor() { }


  addBooking(bookingDetails: Booking_details): void {
    this.bookings=bookingDetails;
  }

  
  getBookings(): any{
    return this.bookings;
  }
}
