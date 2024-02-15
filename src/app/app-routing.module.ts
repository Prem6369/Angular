import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResortDetailsComponent } from './resort-details/resort-details.component';
import { ResortRoomsComponent } from './resort-rooms/resort-rooms.component';
import { ResortThankyouComponent } from './resort-thankyou/resort-thankyou.component';
import { UserProfile, UserProfileComponent } from './user-profile/user-profile.component';
import { ResortLoginComponent } from './resort-login/resort-login.component';
import { ResortListComponent } from './resort-list/resort-list.component';
import { ResortAddGuestComponent } from './resort-add-guest/resort-add-guest.component';
import { ResortAddEmployeeComponent } from './resort-add-employee/resort-add-employee.component';
import { BookingPreviewComponent } from './booking-preview/booking-preview.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Navbar',component:NavbarComponent},
  {path:'Resortdetails',component:ResortDetailsComponent},
  { path:'Resortrooms',component:ResortRoomsComponent},
  {path : 'Thankyou',component:ResortThankyouComponent},
  {path:'Profile',component:UserProfileComponent},
  {path:'',component:ResortLoginComponent},
  {path:'Resortlist',component:ResortListComponent},
  {path:'Addguest',component:ResortAddGuestComponent},
  {path:'Addemployee',component:ResortAddEmployeeComponent},
  {path:'booking-preview',component:BookingPreviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
