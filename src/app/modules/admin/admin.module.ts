import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { InsertResortDetailsComponent } from './components/insert-resort-details/insert-resort-details.component';
import { AddRoomtypeComponent } from './components/add-roomtype/add-roomtype.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ResortDetailsPreviewComponent } from './components/resort-details-preview/resort-details-preview.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { UpdateResortDetailsComponent } from './components/update-resort-details/update-resort-details.component';
import { AdminRoutingModule } from './admin-routing.module';
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
    AdminHomeComponent,
    InsertResortDetailsComponent,
    AddRoomtypeComponent,
    AdminProfileComponent,
    ResortDetailsPreviewComponent,
    RoomListComponent,
    UpdateResortDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    // AsyncPipe,
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
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    // MatButtonToggleModule,
    // MatTooltipModule
  ],
  providers: [provideNativeDateAdapter()],
})
export class AdminModule { }
