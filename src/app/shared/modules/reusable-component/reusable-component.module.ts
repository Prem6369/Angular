import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { UserLayouttComponent } from './components/layouts/user-layoutt/user-layoutt.component';
import { AdminHeaderComponent } from './components/layouts/admin-header/admin-header.component';
import { UserHeaderComponent } from './components/layouts/user-header/user-header.component';
import { ApproverHeaderComponent } from './components/layouts/approver-header/approver-header.component';
import { ApproverLayoutComponent } from './components/layouts/approver-layout/approver-layout.component';

@NgModule({
  declarations: [
    UpdateProfileComponent,
    AdminLayoutComponent,
    UserLayouttComponent,
    AdminHeaderComponent,
    UserHeaderComponent,
    ApproverHeaderComponent,
    ApproverLayoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
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
  exports:[
    UpdateProfileComponent,
  ]
})
export class ReusableComponentModule { }
