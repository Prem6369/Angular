import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { GuestService } from '../../Service/GuestService';

@Component({
  selector: 'app-resort-login',
  templateUrl: './resort-login.component.html',
  styleUrl: './resort-login.component.scss',
})
export class ResortLoginComponent implements OnInit {
  signInForm = new FormGroup({
    Username: new FormControl(''),
    password: new FormControl(''),
  });
  Errormessage:string='';
  constructor(private guestService: GuestService,
    private router: Router, 
    private httpClient: HttpClient,
    private session:SessionServiceService) {}
    
  ngOnInit(): void {
    this.guestService.resetService()
  }

  Login() {
    var Loginvalues = this.signInForm.value;
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpClient
      .post<any>(`https://localhost:7036/api/login/singin`, Loginvalues, {
        headers,
        responseType: 'json',
      })
      .subscribe((response) => {
        console.log(response);
        if("Unknow User"==response.name){
          this.Errormessage='Incorrect Username and Password'
        }else{
          this.SuccessfullLogin(response.id,response.name,response.role)
          this.session.AddSessionvalues(response.id,response.name);
        }
      });
      console.log(this.session.GetSessionvalues())
  }


  SuccessfullLogin(id:number,name:string,role:string){
    if(role==="user")
    {
      this.router.navigate(['/user/Home']);
    }
    else if (role==="admin")
    {
      this.router.navigate(['/admin/home']);
    }else{
      this.router.navigate(['/approver/managebooking'])
    }
    this.session.SetUserAuthentication(id,name);

  }
}
