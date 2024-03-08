import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiUserServiceRepo } from '../../Repository/user_repository';
import { Booking, BookingResponse } from '../../Model/BookingDetaills/Booking';
import { BookingService } from '../../Service/BookingService';
import { GuestService } from '../../Service/GuestService';
import { DateService } from '../../Service/DateTime';

@Component({
  selector: 'app-update-booking-details',
  templateUrl: './update-booking-details.component.html',
  styleUrl: './update-booking-details.component.scss',
})
export class UpdateBookingDetailsComponent implements OnInit {
  booking_id!: number;
  booking_details!: BookingResponse;
  updatedvalues: any[] = [];
  resortid!:any;

  constructor(
    private route: ActivatedRoute,
    private repo: ApiUserServiceRepo,
    private router: Router,
    private booking: BookingService,
    private guest: GuestService,
    private dateService:DateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.booking_id = +params['id'];
    });
    this.getBookingDetails();
    this.updatedvalues = this.booking.getUpdatedBookings();
    console.log(this.updatedvalues);
  }

  getBookingDetails() {
    debugger;
    this.repo
      .getBookingDetailsById(this.booking_id)
      .subscribe((response: any[]) => {
        this.booking_details = response[0];
        console.log('Booking details', this.booking_details);
          this.resortid = btoa(this.booking_details.resort_id.toString());
    
        this.guest.addEmployee(this.booking_details.employees);
        this.guest.addGuest(this.booking_details.guests);
        this.dateService.checkInDate = new Date(this.booking_details.check_in_date);
        this.dateService.checkOutDate = new Date(this.booking_details.check_out_date);



      });
  }

  changeCheckinout() {
    this.router.navigate(['/user/Resortlist'], {
      queryParams: { booking_id: this.booking_id },
    });
  }

room() {
    if (this.booking_details && Array.isArray(this.booking_details.bookingRoomRequests)) {
        this.booking_details.bookingRoomRequests.forEach((roomRequest: any) => {
            const roomTypeId = roomRequest.room_type_id;
            const roomTypeCount = roomRequest.room_type_count;

            console.log(`Room Type ID: ${roomTypeId}, Room Type Count: ${roomTypeCount}`);

            this.router.navigate(['/user/Resortrooms'], { queryParams:
               { ID:this.resortid,room_id:roomTypeId,room_count:roomTypeCount} });

        });

    } else {
        console.log("Booking details or bookingRoomRequests array not found");
    }

}

}
