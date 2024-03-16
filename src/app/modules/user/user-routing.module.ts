import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPreviewComponent } from './components/booking-preview/booking-preview.component';
import { HomeComponent } from './components/home/home.component';
import { ResortAddEmployeeComponent } from './components/resort-add-employee/resort-add-employee.component';
import { ResortAddGuestComponent } from './components/resort-add-guest/resort-add-guest.component';
import { ResortBookingDetailsComponent } from './components/resort-booking-details/resort-booking-details.component';
import { ResortDetailsComponent } from './components/resort-details/resort-details.component';
import { ResortListComponent } from './components/resort-list/resort-list.component';
import { ResortRoomsComponent } from './components/resort-rooms/resort-rooms.component';
import { ResortThankyouComponent } from './components/resort-thankyou/resort-thankyou.component';
import { UpdateBookingDetailsComponent } from './components/update-booking-details/update-booking-details.component';
import { UpdateProfileComponent } from '../../shared/modules/reusable-component/components/update-profile/update-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
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
  { path: 'update-booking', component: UpdateBookingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
