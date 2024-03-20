import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../../../../core/service/Session/session-service.service';
import { Booking } from '../../../../core/model/BookingDetaills/Booking';
import { ApiUserServiceRepo } from '../../../../core/repository/user_repository';
import { Router } from '@angular/router';
import { encryptDecrypt } from '../../../../core/service/EncryptDecrypt';


@Component({
  selector: 'app-resort-booking-details',
  templateUrl: './resort-booking-details.component.html',
  styleUrls: ['./resort-booking-details.component.scss'], 
})
export class ResortBookingDetailsComponent implements OnInit {
  Bookings_list: Booking[] = [];
  user_id!: number;
  username: string = '';
  bookedresort: any[] = [];
  confirmedBookings: any[] = [];
  pendingBookings: any[] = [];

  constructor(
    private session: SessionServiceService,
    private repository: ApiUserServiceRepo,
    private router:Router,
    private encryptdecrypt:encryptDecrypt
  ) {}

  ngOnInit(): void {
    this.getBookingDetails();
  }

  getBookingDetails() {
    this.user_id = this.session.getUserId();
    this.username = this.session.getUserName();
    this.repository.bookedResortById(this.user_id).subscribe(
      (response) => {
        this.bookedresort = response.bookings;
        response.bookings.forEach((booking: any) => {
          if (booking.booking_status === 'confirmed') {
            this.confirmedBookings.push(booking);
          } else if (booking.booking_status === 'Pending') {
            this.pendingBookings.push(booking);
          }
        });
      },
      (error) => {
        console.error('Error fetching resort details:', error);
        alert('Failed to fetch User details. Please try again later.');
      }
    );
  }
  
  navigateToUpdateBooking(booking_id:number)
  {
    debugger;
    const encryptedBookingId = this.encryptdecrypt.encrypt(booking_id);
    this.router.navigate(['/user/update-booking'], { queryParams: { id: encryptedBookingId} });
    }
}
