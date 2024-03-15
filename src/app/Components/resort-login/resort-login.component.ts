import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { GuestService } from '../../Service/GuestService';
import { apiLoginService } from '../../Repository/login_repository';

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

  hide = true;
  Errormessage:string='';


  constructor(private guestService: GuestService,
    private router: Router, 
    private session:SessionServiceService,
    private repository:apiLoginService) {}
    
  ngOnInit(): void {
    this.guestService.resetService()
  }

  Login() {
    debugger;
    var Loginvalues = this.signInForm.value;
    this.repository.signin(Loginvalues).subscribe((response)=>{
      if("Unknow User"==response.name){
        this.Errormessage='Incorrect Username and Password'
      }else{
        this.SuccessfullLogin(response.id,response.name,response.role)
        debugger;
        this.session.AddSessionvalues(response.id,response.name);
      }
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }


  SuccessfullLogin(id:number,name:string,role:string){
    debugger;
    if(role==="user")
    {
      this.router.navigate(['/user/Home']);
    }
    else if (role==="admin")
    {
      this.router.navigate(['/admin/home']);
    }else if (role==="Approver"){
      this.router.navigate(['/approver/approverhome']);
    }
    else{
      this.router.navigate([''])

    }
    this.session.SetUserAuthentication(id,name,role);

  }
}
