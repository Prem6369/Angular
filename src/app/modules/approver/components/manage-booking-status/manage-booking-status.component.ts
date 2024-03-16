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
        this.resortId = this.Bookings_list.map((booking) => booking.resort_id);
        this.userId = this.Bookings_list.map((booking) => booking.user_id);
        this.fetchResortNames(0);
        this.getUserName(0);
      }
    );
  }

  fetchResortNames(index: number) {
    if (index >= this.resortId.length) {
      this.mergeResortNames();
      return;
    }
    const resortId = this.resortId[index];
    const params = resortId;
    this.repo.getResortDetails(params)
      .subscribe((response) => {
        this.resortname.push(response.name);
        this.fetchResortNames(index + 1);
      });
  }



  getUserName(userIndex: number) {
    if (userIndex >= this.userId.length) {
      this.mergeResortNames();
      return;
    }
    const userid = this.userId[userIndex];
    const params = userid;
    this.repo.getUserProfile(params).subscribe((response) => {
      this.username.push(response.username);
      this.getUserName(userIndex + 1);
    });
  }


  mergeResortNames() {
    this.Bookings_list.forEach((booking, index) => {
      booking.resort_name = this.resortname[index];
    });
    this.Bookings_list.forEach((booking, userindex) => {
      booking.username = this.username[userindex];
    });
    console.log(this.Bookings_list);
  }


  onchange($event: any, id: number, approverid: number) {
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
