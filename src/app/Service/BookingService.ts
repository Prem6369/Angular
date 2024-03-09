import { Injectable } from "@angular/core";
import { Booking_details, UpdatedBooking_details } from "../Model/bookingDetails";
import { Updatedroom } from "../Model/BookingDetaills/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  bookings!:Booking_details;
  updatedBooking!:UpdatedBooking_details;
  updatedrooms!:Updatedroom;
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
  
  Updatedrooms(updatedroos:Updatedroom):void{
    this.updatedrooms=updatedroos;
  }
  getUpdatedRoom():any{

    return this.updatedrooms;
  }



}
