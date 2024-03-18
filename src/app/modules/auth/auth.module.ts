import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResortLoginComponent } from './components/resort-login/resort-login.component';
import { ResortSignupComponent } from './components/resort-signup/resort-signup.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ForbiddenComponent,
    ResortSignupComponent,
    ResortLoginComponent,
  ],
  imports: [
    AuthRoutingModule,
    AsyncPipe,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [],
})
export class AuthModule { }
