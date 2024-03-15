import { Injectable } from "@angular/core";
import { Booking_details, UpdatedBooking_details } from "../model/BookingDetaills/bookingDetails";
import { Updatedroom } from "../model/BookingDetaills/Booking";

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

  resetBooking() {
    this.updatedBooking = {
      check_in_date: new Date(0),
      check_out_date: new Date(0),
      resort_id: 0,
      roomTypes_Req:[]
    }
  }


}
