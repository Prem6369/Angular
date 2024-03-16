import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import {MatTabsModule} from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    BookingPreviewComponent,
    HomeComponent,
    ResortAddEmployeeComponent,
    ResortAddGuestComponent,
    ResortBookingDetailsComponent,
    UserProfileComponent,
    UpdateBookingDetailsComponent,
    ResortThankyouComponent,
    ResortDetailsComponent,
    ResortListComponent,
    ResortRoomsComponent,
  ],
  imports: [
    AsyncPipe,
    MatDateRangeInput,
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  providers: [provideNativeDateAdapter()],
})
export class UserModule { }
