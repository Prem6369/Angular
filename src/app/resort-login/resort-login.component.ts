import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resort-login',
  templateUrl: './resort-login.component.html',
  styleUrl: './resort-login.component.scss'
})
export class ResortLoginComponent {


  signInForm = new FormGroup(
    {
      userName : new FormControl(''),
      password : new FormControl('')
    })

    constructor(private router:Router,private httpClient:HttpClient){}
 
  returnToRespectivePage()
  {
     console.log(this.signInForm.value);
     console.log('Sign in successfully');
     this.router.navigate(['/Home']);
  }
}
