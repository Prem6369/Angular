import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../../../../core/service/Session/session-service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { approver_repository } from '../../../../core/repository/approver_repository';

@Component({
  selector: 'app-change-approver',
  templateUrl: './change-approver.component.html',
  styleUrl: './change-approver.component.scss',
})
export class ChangeApproverComponent implements OnInit {
  roomTypeId!: number;
  approverid!: number;
  Bookings_list: any[] = [];
  resortId: any[] = [];
  resortname: any[] = [];
  userId: any[] = [];
  username: any[] = [];
  resortimage: any[] = [];
  approver: any[] = [];
  user: any[] = [];

  constructor(
    private repo: approver_repository,
    private session: SessionServiceService
  ) {}

  ngOnInit(): void {
    this.approverid = this.session.getUserId();
    this.getBookingstatus();
    this.getApprover();
  }

  getBookingstatus(): any {
    this.repo.getBookingRequest(this.approverid).subscribe((response) => {
      this.Bookings_list = response;
    });
  }

  onchange(id: number) {
    const value = {
      booking_id: id,
      approver_id: this.value.value.approver_id,
    };
    this.repo.changeApporver(value).subscribe((response) => {
      if (response) {
        this.getBookingstatus();
      }
    });
  }

  getApprover() {
    this.repo.geUsers().subscribe((response) => {
      this.user = response;
      this.user.forEach((user) => {
        if (user.role === 'Approver') {
          this.approver.push(user);
        }
      });
    });
  }

  value = new FormGroup({
    approver_id: new FormControl(0),
  });

  selectt(event: any) {
    this.roomTypeId = event.target.value;
    this.value.patchValue({
      approver_id: this.roomTypeId,
    });
  }
}
