import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { Booking } from '../../Model/BookingDetaills/Booking';

@Component({
  selector: 'app-resort-booking-details',
  templateUrl: './resort-booking-details.component.html',
  styleUrl: './resort-booking-details.component.scss'
})
export class ResortBookingDetailsComponent implements OnInit{

  Bookings_list:Booking[]=[]
  user_id!:number;
  username:string=''
  bookedresort:[]=[];
  confirmedBookings: any[] = [];
pendingBookings: any[] = [];
constructor(private httpclient:HttpClient,private session:SessionServiceService){}
  ngOnInit(): void {
    this.getBookingDetails()
  }
  
  getBookingDetails(){
    this.user_id = this.session.getUserId();
    this.username = this.session.getUserName();

    const token = ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJjMmVhMDZiOC03YmRiLTQyYTktYTFmYi05YmJjMGYyYzVlNGIiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMzEzMzhjZGEtMDliMC00NjU3LWI1MzMtNTA3NTRmNTMyMWYzIiwibmJmIjoxNzA5MDExMzc3LCJleHAiOjE3MDkwNzEzNzcsImlhdCI6MTcwOTAxMTM3NywiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.qTgZalSx-yA9hZklTloO3zMe_voSZCJ-1UvnF4OfSFs';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const params = new HttpParams().set('user_id',this.user_id);
    this.httpclient.get<any>
    (`https://localhost:7036/api/resorts/getbookeduserlist`,{headers,params}).subscribe
    ((response=>{
      console.log(response);
      this.bookedresort=response.bookings;
      
      response.bookings.forEach((booking: any) => {
        if (booking.booking_status === 'confirmed') {
          this.confirmedBookings.push(booking);
        } else if (booking.booking_status === 'Pending') {
          this.pendingBookings.push(booking);
        }
        else if (booking.booking_status === 'string'){
          this.pendingBookings.push(booking);
        }
      });

      console.log(this.confirmedBookings);
      console.log(this.pendingBookings);

      console.log(this.bookedresort)
      response.bookings.forEach((book: any) => {
        const booking_status = book.booking_status; 
        console.log(booking_status)
      });
      const BookingDetails=new Booking(
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
      console.log(this.Bookings_list)
    }));

  }
}
