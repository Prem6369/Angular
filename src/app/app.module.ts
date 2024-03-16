import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/user/components/home/home.component';
import { RouterModule } from '@angular/router';
import { ResortDetailsComponent } from './modules/user/components/resort-details/resort-details.component';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResortRoomsComponent } from './modules/user/components/resort-rooms/resort-rooms.component';
import { ResortThankyouComponent } from './modules/user/components/resort-thankyou/resort-thankyou.component';
import { UserProfileComponent } from './modules/user/components/user-profile/user-profile.component';
import { ResortLoginComponent } from './modules/auth/components/resort-login/resort-login.component';
import { ResortListComponent } from './modules/user/components/resort-list/resort-list.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResortAddGuestComponent } from './modules/user/components/resort-add-guest/resort-add-guest.component';
import { ResortAddEmployeeComponent } from './modules/user/components/resort-add-employee/resort-add-employee.component';
import { BookingPreviewComponent } from './modules/user/components/booking-preview/booking-preview.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {AsyncPipe} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { AdminLayoutComponent } from './shared/modules/reusable-component/components/layouts/admin-layout/admin-layout.component';
import { UserLayouttComponent } from './shared/modules/reusable-component/components/layouts/user-layoutt/user-layoutt.component';
import { ResortBookingDetailsComponent } from './modules/user/components/resort-booking-details/resort-booking-details.component';
import { UpdateProfileComponent } from './shared/modules/reusable-component/components/update-profile/update-profile.component';
import { AdminHeaderComponent } from './shared/modules/reusable-component/components/layouts/admin-header/admin-header.component';
import { UserHeaderComponent } from './shared/modules/reusable-component/components/layouts/user-header/user-header.component';
import { NotFoundComponent } from './modules/auth/components/not-found/not-found.component';
import { ResortSignupComponent } from './modules/auth/components/resort-signup/resort-signup.component';
import { InsertResortDetailsComponent } from './modules/admin/components/insert-resort-details/insert-resort-details.component';
import { AddRoomtypeComponent } from './modules/admin/components/add-roomtype/add-roomtype.component';
import { ApproverHeaderComponent } from './shared/modules/reusable-component/components/layouts/approver-header/approver-header.component';
import { ApproverLayoutComponent } from './shared/modules/reusable-component/components/layouts/approver-layout/approver-layout.component';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ResortDetailsPreviewComponent } from './modules/admin/components/resort-details-preview/resort-details-preview.component';
import { ManageBookingStatusComponent } from './modules/approver/components/manage-booking-status/manage-booking-status.component';
import { ChangeApproverComponent } from './modules/approver/components/change-approver/change-approver.component';
import { ApproverHomeComponent } from './modules/approver/components/approver-home/approver-home.component';
import { AdminHomeComponent } from './modules/admin/components/admin-home/admin-home.component';
import { UpdateResortDetailsComponent } from './modules/admin/components/update-resort-details/update-resort-details.component';
import { AdminProfileComponent } from './modules/admin/components/admin-profile/admin-profile.component';
import { ApproverProfileComponent } from './modules/approver/components/approver-profile/approver-profile.component';
import { RoomListComponent } from './modules/admin/components/room-list/room-list.component';
import { UpdateBookingDetailsComponent } from './modules/user/components/update-booking-details/update-booking-details.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ForbiddenComponent } from './modules/auth/components/forbidden/forbidden.component';

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
    AdminHeaderComponent,
    UserHeaderComponent,
    NotFoundComponent,
    ResortSignupComponent,
    InsertResortDetailsComponent,
    AddRoomtypeComponent,
    ApproverHeaderComponent,
    ApproverLayoutComponent,
    ResortDetailsPreviewComponent,
    ManageBookingStatusComponent,
    ChangeApproverComponent,
    ApproverHomeComponent,
    AdminHomeComponent,
    RoomListComponent,
    UpdateResortDetailsComponent,
    AdminProfileComponent,
    ApproverProfileComponent,
    UpdateBookingDetailsComponent,
    ForbiddenComponent,
    
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
    MatDateRangeInput,MatNativeDateModule,MatFormFieldModule,MatButtonModule,MatAutocompleteModule,
    AsyncPipe,MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatButtonToggleModule,
     MatTooltipModule,

  ],
  providers: [provideNativeDateAdapter()],
  bootstrap: [AppComponent]
})
export class AppModule { }
