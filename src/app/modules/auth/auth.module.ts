import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResortLoginComponent } from './components/resort-login/resort-login.component';
import { ResortSignupComponent } from './components/resort-signup/resort-signup.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthRoutingModule } from './auth-routing.module';
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
    ForbiddenComponent,
    ResortSignupComponent,
    ResortLoginComponent,
  ],
  imports: [
    AuthRoutingModule,
    AsyncPipe,
    MatDateRangeInput,
    CommonModule,
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
export class AuthModule { }
