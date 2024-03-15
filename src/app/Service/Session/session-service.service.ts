import { Injectable } from '@angular/core';
import { Router  } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor(private router: Router) { }


  private authentication: boolean = false;
  private User_id!:number;
  private Username:string='';
  private role:string="";

  sessionvalues:any[]=[];


  SetUserAuthentication(id:number,name:string,role:string){
    this.authentication=true;
    this.User_id=id;
    this.Username=name;
    this.role=role;
    sessionStorage.setItem('user_id',this.User_id.toString());
    sessionStorage.setItem('username',this.Username)

  }

  canActivate(): boolean {
    if (this.authentication) {   
      if (this.role === 'admin' || this.role === 'Approver' || this.role === 'user') {
        return true;
      } else {
        this.router.navigate(['']);
        return false;
      }
    } else {
      this.router.navigate(['/forbidden']);
      return false;
    } 
  }


  AddSessionvalues(id:string,name:string){

    this.sessionvalues.push(id,name)
  }

  isAuthenticatedUser(): boolean {
    return this.authentication;
  }

  GetSessionvalues(): any[] {
    return this.sessionvalues;
  }

  getUserName(): string {
    return this.Username;
  }

  getUserId(): number {
    return this.User_id;
  }

  logout() {
    this.Username = '';
    this.User_id;
    this.router.navigate(['']);
    sessionStorage.clear(); 
  }
}
