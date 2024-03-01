import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { RouterModule } from '@angular/router';
import { ResortDetailsComponent } from './Components/resort-details/resort-details.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResortRoomsComponent } from './Components/resort-rooms/resort-rooms.component';
import { ResortThankyouComponent } from './Components/resort-thankyou/resort-thankyou.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ResortLoginComponent } from './Components/resort-login/resort-login.component';
import { ResortListComponent } from './Components/resort-list/resort-list.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResortAddGuestComponent } from './Components/resort-add-guest/resort-add-guest.component';
import { ResortAddEmployeeComponent } from './Components/resort-add-employee/resort-add-employee.component';
import { BookingPreviewComponent } from './Components/booking-preview/booking-preview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { AdminLayoutComponent } from './Components/layouts/admin-layout/admin-layout.component';
import { UserLayouttComponent } from './Components/layouts/user-layoutt/user-layoutt.component';
import { ResortBookingDetailsComponent } from './Components/resort-booking-details/resort-booking-details.component';
import { UpdateProfileComponent } from './Components/update-profile/update-profile.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AdminHeaderComponent } from './Components/layouts/admin-header/admin-header.component';
import { UserHeaderComponent } from './Components/layouts/user-header/user-header.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ResortSignupComponent } from './Components/resort-signup/resort-signup.component';
import { InsertResortDetailsComponent } from './Components/insert-resort-details/insert-resort-details.component';
import { AddRoomtypeComponent } from './Components/add-roomtype/add-roomtype.component';
import {MatStepperModule} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InputNumberModule } from 'primeng/inputnumber';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ResortDetailsPreviewComponent } from './Components/resort-details-preview/resort-details-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResortDetailsComponent,
    ResortRoomsComponent,
    ResortThankyouComponent,
    UserProfileComponent,
    ResortLoginComponent,
    ResortListComponent,
    ResortAddGuestComponent,
    ResortAddEmployeeComponent,
    BookingPreviewComponent,
    AdminLayoutComponent,
    UserLayouttComponent,
    ResortBookingDetailsComponent,
    UpdateProfileComponent,
    FooterComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    NotFoundComponent,
    ResortSignupComponent,
    InsertResortDetailsComponent,
    AddRoomtypeComponent,
    ResortDetailsPreviewComponent,
    
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
    MatStepperModule,
    MatDatepickerModule,
    MatDateRangeInput,MatNativeDateModule,MatFormFieldModule,MatButtonModule,MatAutocompleteModule,
    AsyncPipe,MatInputModule,
    LeafletModule,
    InputNumberModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter(),{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false},
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
