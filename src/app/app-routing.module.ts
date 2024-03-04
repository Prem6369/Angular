import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ResortDetailsComponent } from './Components/resort-details/resort-details.component';
import { ResortRoomsComponent } from './Components/resort-rooms/resort-rooms.component';
import { ResortThankyouComponent } from './Components/resort-thankyou/resort-thankyou.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ResortLoginComponent } from './Components/resort-login/resort-login.component';
import { ResortListComponent } from './Components/resort-list/resort-list.component';
import { ResortAddGuestComponent } from './Components/resort-add-guest/resort-add-guest.component';
import { ResortAddEmployeeComponent } from './Components/resort-add-employee/resort-add-employee.component';
import { BookingPreviewComponent } from './Components/booking-preview/booking-preview.component';
import { ResortBookingDetailsComponent } from './Components/resort-booking-details/resort-booking-details.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { UserLayouttComponent } from './Components/layouts/user-layoutt/user-layoutt.component';
import { AdminLayoutComponent } from './Components/layouts/admin-layout/admin-layout.component';
import { InsertResortDetailsComponent } from './Components/insert-resort-details/insert-resort-details.component';
import { AddRoomtypeComponent } from './Components/add-roomtype/add-roomtype.component';
import { ResortSignupComponent } from './Components/resort-signup/resort-signup.component';
import { ApproverLayoutComponent } from './Components/layouts/approver-layout/approver-layout.component';
import { ManageBookingComponent } from './Components/manage-booking/manage-booking.component';
import { ResortDetailsPreviewComponent } from './Components/resort-details-preview/resort-details-preview.component';
import { ManageBookingStatusComponent } from './Components/manage-booking-status/manage-booking-status.component';
import { ChangeApproverComponent } from './Components/change-approver/change-approver.component';
import { ApproverHomeComponent } from './Components/approver-home/approver-home.component';



const routes: Routes = [
  { path: '', component: ResortLoginComponent },
  { path: 'Signup',component:ResortSignupComponent},

  {
    path: 'user',
    component: UserLayouttComponent,
    children: [
      { path: 'Home', component: HomeComponent },
      { path: 'Resortlist', component: ResortListComponent },
      { path: 'Resortdetails', component: ResortDetailsComponent },
      { path: 'Profile', component: UserProfileComponent },
      { path: 'Addguest', component: ResortAddGuestComponent },
      { path: 'Addemployee', component: ResortAddEmployeeComponent },
      { path: 'booking-preview', component: BookingPreviewComponent },
      { path: 'booking-details', component: ResortBookingDetailsComponent },
      { path: 'UpdateProfile', component: UpdateProfileComponent },
      { path: 'Resortrooms', component: ResortRoomsComponent },
      { path: 'Thankyou', component: ResortThankyouComponent },
    ]
  },
  {
    path:'admin',
    component:AdminLayoutComponent,
    children:[ 
        {path:'insert_resortdetails',component:InsertResortDetailsComponent},
        {path:'addroomtype',component:AddRoomtypeComponent},
        {path:'resort-details-preview',component:ResortDetailsPreviewComponent}
    ]
  },

  {
    path:'approver',
    component:ApproverLayoutComponent,
    children:[
      { path :'approverhome',component:ApproverHomeComponent},
      { path :'managebooking',component:ManageBookingComponent},
      { path : 'managestatus',component:ManageBookingStatusComponent},
      { path : 'changeapprover',component:ChangeApproverComponent}
    ]
  },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
