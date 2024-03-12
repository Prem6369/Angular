import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { Booking } from '../../Model/BookingDetaills/Booking';
import { ApiUserServiceRepo } from '../../Repository/user_repository';
import { Router } from '@angular/router';

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
    private router:Router
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
     
        response.bookings.forEach((booking: any) => {
          if (booking.booking_status === 'confirmed') {
            this.confirmedBookings.push(booking);
          } else if (booking.booking_status === 'Pending') {
            this.pendingBookings.push(booking);
          }
        });
        response.bookings.forEach((book: any) => {
          const booking_status = book.booking_status;
          console.log(booking_status);
        });
        const BookingDetails = new Booking(
          response.user_id,
          response.first_name,
          response.last_name,
          response.claySys_email,
          response.phone_number,
          response.address,
          response.age,
          response.allotted_stays,
          response.bookings,
          response.claysys_id_card_image_url,
          response.created_date,
          response.employee_id,
          response.gender,
          response.last_modified_date,
          response.lead,
          response.official_id_card_no,
          response.official_id_image_url,
          response.remaining_days,
          response.role,
          response.status,
          response.used_stays,
          response.username
        );
        this.Bookings_list.push(BookingDetails);
      },
      (error) => {
        console.error('Error fetching resort details:', error);
        alert('Failed to fetch User details. Please try again later.');
      }
    );
  }

  navigateToUpdateBooking(booking_id:number,resort_name:string)
  {
    this.router.navigate(['/user/update-booking'],{ queryParams: { id:booking_id } })
  }
}
