import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { InsertResortDetailsComponent } from './components/insert-resort-details/insert-resort-details.component';
import { AddRoomtypeComponent } from './components/add-roomtype/add-roomtype.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { ResortDetailsPreviewComponent } from './components/resort-details-preview/resort-details-preview.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { UpdateProfileComponent } from '../../shared/modules/reusable-component/components/update-profile/update-profile.component';
import { UpdateResortDetailsComponent } from './components/update-resort-details/update-resort-details.component';

const routes: Routes = [
  { path: 'home', component: AdminHomeComponent },
  { path: 'insert_resortdetails', component: InsertResortDetailsComponent },
  { path: 'addroomtype', component: AddRoomtypeComponent },
  { path: 'resort-details-preview', component: ResortDetailsPreviewComponent },
  { path: 'resort-details-update', component: UpdateResortDetailsComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: 'UpdateProfile', component: UpdateProfileComponent },
  { path: 'roomlist', component: RoomListComponent },
  { path: 'resort-details-update', component: UpdateResortDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
