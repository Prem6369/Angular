import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproverHomeComponent } from './components/approver-home/approver-home.component';
import { ApproverProfileComponent } from './components/approver-profile/approver-profile.component';
import { ChangeApproverComponent } from './components/change-approver/change-approver.component';
import { ManageBookingStatusComponent } from './components/manage-booking-status/manage-booking-status.component';
import { ApproverRoutingModule } from './approver-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core'; 



@NgModule({
  declarations: [
    ApproverHomeComponent,
    ManageBookingStatusComponent,
    ChangeApproverComponent,
    ApproverProfileComponent,
    ApproverHomeComponent,
  ],
  imports: [
    CommonModule,
    ApproverRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class ApproverModule { }
