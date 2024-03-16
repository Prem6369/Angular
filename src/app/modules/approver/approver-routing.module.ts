import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproverHomeComponent } from './components/approver-home/approver-home.component';
import { ApproverProfileComponent } from './components/approver-profile/approver-profile.component';
import { ChangeApproverComponent } from './components/change-approver/change-approver.component';
import { ManageBookingStatusComponent } from './components/manage-booking-status/manage-booking-status.component';
import { UpdateProfileComponent } from '../../shared/modules/reusable-component/components/update-profile/update-profile.component';

const routes: Routes = [
  { path: 'approverhome', component: ApproverHomeComponent },
  { path: 'managestatus', component: ManageBookingStatusComponent },
  { path: 'changeapprover', component: ChangeApproverComponent },
  { path: 'approver-profile', component: ApproverProfileComponent },
  { path: 'UpdateProfile', component: UpdateProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproverRoutingModule { }
