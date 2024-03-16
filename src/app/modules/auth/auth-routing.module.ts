import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResortLoginComponent } from './components/resort-login/resort-login.component';
import { ResortSignupComponent } from './components/resort-signup/resort-signup.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

const routes: Routes = [

  { path: '', component: ResortLoginComponent },
  { path: 'Signup', component: ResortSignupComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
