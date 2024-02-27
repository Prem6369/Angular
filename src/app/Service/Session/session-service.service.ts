import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor(private router: Router) { }
  private authentication: boolean = false;
  private User_id!:number;
  private Username:string='';

  sessionvalues:any[]=[];


  SetUserAuthentication(id:number,name:string){
    this.authentication=true;
    this.User_id=id;
    this.Username=name;

    sessionStorage.setItem('user_id',this.User_id.toString());
    sessionStorage.setItem('username',this.Username)

  }

  AddSessionvalues(id:string,name:string){
    this.sessionvalues.push(id,name)
    console.log("Session:",this.sessionvalues);
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
