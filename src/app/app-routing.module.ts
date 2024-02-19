import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ResortDetailsComponent } from './Components/resort-details/resort-details.component';
import { ResortRoomsComponent } from './Components/resort-rooms/resort-rooms.component';
import { ResortThankyouComponent } from './Components/resort-thankyou/resort-thankyou.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ResortLoginComponent } from './Components/resort-login/resort-login.component';
import { ResortListComponent } from './Components/resort-list/resort-list.component';
import { ResortAddGuestComponent } from './Components/resort-add-guest/resort-add-guest.component';
import { ResortAddEmployeeComponent } from './Components/resort-add-employee/resort-add-employee.component';
import { BookingPreviewComponent } from './Components/booking-preview/booking-preview.component';

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
