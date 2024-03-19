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
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core'; 
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';


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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class AdminModule { }
