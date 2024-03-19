import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../../../../core/service/Session/session-service.service';
import { approver_repository } from '../../../../core/repository/approver_repository';

@Component({
  selector: 'app-manage-booking-status',
  templateUrl: './manage-booking-status.component.html',
  styleUrl: './manage-booking-status.component.scss'
})

export class ManageBookingStatusComponent implements OnInit {


  approverid!: number;
  Bookings_list: any[] = [];
  resortId: any[] = [];
  resortname: any[] = [];
  userId: any[] = [];
  username: any[] = [];


  constructor(private repo: approver_repository,
              private session: SessionServiceService) { }

  ngOnInit(): void {
    this.approverid = this.session.getUserId();
    this.getBookingstatus()
  }

  getBookingstatus() {
    this.repo.getBookingRequest(this.approverid).subscribe(
      (response) => {
        this.Bookings_list = response;
        console.log("this.Bookings_list",this.Bookings_list);
            }
    );
  }

  onchange($event: any, id: number, approverid: number) {
    debugger;
    const changestatus = $event.target.value;
    const value = {
      booking_id: id,
      approver_id: approverid,
      status: changestatus,
      message: 'thankyou'
    };
    this.repo.changeStatus(value).subscribe(
      (response) => {
        console.log('Response:', response);
      }
    );
  }
}
