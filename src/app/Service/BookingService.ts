import { Injectable } from "@angular/core";
import { Booking_details, UpdatedBooking_details } from "../Model/bookingDetails";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookings!:Booking_details;
  updatedBooking!:UpdatedBooking_details;
  constructor() { }


  addBooking(bookingDetails: Booking_details): void {
    this.bookings=bookingDetails;
  }

  UpdatedBooking(updateddetails:UpdatedBooking_details):void{
    this.updatedBooking=updateddetails;
  }
  
  getBookings(): any{
    return this.bookings;
  }

  getUpdatedBookings(): any{
    return this.updatedBooking;
  }
  
}
