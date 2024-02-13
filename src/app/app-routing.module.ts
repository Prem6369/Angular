import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResortDetailsComponent } from './resort-details/resort-details.component';
import { ResortRoomsComponent } from './resort-rooms/resort-rooms.component';
import { ResortThankyouComponent } from './resort-thankyou/resort-thankyou.component';
import { UserProfile, UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Navbar',component:NavbarComponent},
  {path:'ResortDetails',component:ResortDetailsComponent},
  { path:'Resortrooms',component:ResortRoomsComponent},
  {path : 'Thankyou',component:ResortThankyouComponent},
  {path:'Profile',component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
