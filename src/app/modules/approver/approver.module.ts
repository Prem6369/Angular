import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproverHomeComponent } from './components/approver-home/approver-home.component';
import { ApproverProfileComponent } from './components/approver-profile/approver-profile.component';
import { ChangeApproverComponent } from './components/change-approver/change-approver.component';
import { ManageBookingStatusComponent } from './components/manage-booking-status/manage-booking-status.component';
import { ApproverRoutingModule } from './approver-routing.module';
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
    ApproverHomeComponent,
    ManageBookingStatusComponent,
    ChangeApproverComponent,
    ApproverProfileComponent,
    ApproverHomeComponent,
  ],
  imports: [
    CommonModule,
    // AsyncPipe,
    ApproverRoutingModule,
    // MatDateRangeInput,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // MatTabsModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatFormFieldModule,
    // MatButtonModule,
    // MatAutocompleteModule,
    // MatInputModule,
    // MatChipsModule,
    // MatIconModule,
    // MatButtonToggleModule,
    // MatTooltipModule
  ],
  providers: [provideNativeDateAdapter()],
})
export class ApproverModule { }
