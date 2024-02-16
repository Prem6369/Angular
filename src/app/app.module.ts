import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ResortDetailsComponent } from './resort-details/resort-details.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResortRoomsComponent } from './resort-rooms/resort-rooms.component';
import { ResortThankyouComponent } from './resort-thankyou/resort-thankyou.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResortLoginComponent } from './resort-login/resort-login.component';
import { ResortListComponent } from './resort-list/resort-list.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResortAddGuestComponent } from './resort-add-guest/resort-add-guest.component';
import { ResortAddEmployeeComponent } from './resort-add-employee/resort-add-employee.component';
import { BookingPreviewComponent } from './booking-preview/booking-preview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ResortDetailsComponent,
    ResortRoomsComponent,
    ResortThankyouComponent,
    UserProfileComponent,
    ResortLoginComponent,
    ResortListComponent,
    ResortAddGuestComponent,
    ResortAddEmployeeComponent,
    BookingPreviewComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    MatDatepickerModule,
    MatDateRangeInput,MatNativeDateModule,MatFormFieldModule,MatButtonModule
  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule { }
