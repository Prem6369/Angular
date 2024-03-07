import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUserServiceRepo } from '../../Repository/user_repository';
import { Booking } from '../../Model/BookingDetaills/Booking';

@Component({
  selector: 'app-update-booking-details',
  templateUrl: './update-booking-details.component.html',
  styleUrl: './update-booking-details.component.scss'
})
export class UpdateBookingDetailsComponent implements OnInit {

  booking_id!:number;
  booking_details!:Booking;

  constructor(private route:ActivatedRoute,
    private repo:ApiUserServiceRepo) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.booking_id = +params['id'];
    });
    this.getBookingDetails();
  }

  getBookingDetails()
  {
    debugger;
    this.repo.getBookingDetailsById( this.booking_id).subscribe
    ((response)=>
    {
      this.booking_details=response;
      console.log("Booking details",this.booking_details);
    })

  }



}
