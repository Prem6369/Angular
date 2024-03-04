import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SessionServiceService } from '../../Service/Session/session-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-approver',
  templateUrl: './change-approver.component.html',
  styleUrl: './change-approver.component.scss'
})
export class ChangeApproverComponent implements OnInit {
  approverid!:number;
  Bookings_list: any[] = [];
  resortId: any[] = [];
  resortname: any[] = [];
  userId: any[] = [];
  username: any[] = [];
  resortimage:any[]=[]

  constructor(private http:HttpClient,private session:SessionServiceService){}
  ngOnInit(): void {
    this.approverid=this.session.getUserId();
    this.getBookingstatus()
    this.getApprover();
  }

  getBookingstatus(){
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI3MDRiYzIwYy00ZTM1LTRjOTYtOTA3ZS1kY2RiYzMwN2UzOGMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDdmOTUyNjAtMmE4Zi00OTgwLWE4ODUtZjllNGFiZmE1NGFkIiwibmJmIjoxNzA5MTg5NjQxLCJleHAiOjE3MDkyNDk2NDEsImlhdCI6MTcwOTE4OTY0MSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Ffbt9fZPcZ3wGX7npqHKZ8ovp5cG86qyjoaA67XgUFQ';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = 'https://localhost:7036/api/resorts/getbookingrequest';
    const params=new HttpParams().set("approver_id",this.approverid)
    this.http.get<any>(url,{headers,params}).subscribe(
      (response)=>{
        this.Bookings_list = response;
        this.resortId = this.Bookings_list.map((booking) => booking.resort_id);
        this.userId = this.Bookings_list.map((booking) => booking.user_id);

        this.fetchResortNames(0);
        this.getUserName(0);
      }
    );
  }


  fetchResortNames(index: number) {
    if (index >= this.resortId.length) {
      this.mergeResortNames();
      return;
    }

    const resortId = this.resortId[index];
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI3MDRiYzIwYy00ZTM1LTRjOTYtOTA3ZS1kY2RiYzMwN2UzOGMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDdmOTUyNjAtMmE4Zi00OTgwLWE4ODUtZjllNGFiZmE1NGFkIiwibmJmIjoxNzA5MTg5NjQxLCJleHAiOjE3MDkyNDk2NDEsImlhdCI6MTcwOTE4OTY0MSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Ffbt9fZPcZ3wGX7npqHKZ8ovp5cG86qyjoaA67XgUFQ';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url = 'https://localhost:7036/api/resorts/getresortdetails';

    const params = new HttpParams().set('resort_id', resortId.toString());

    this.http.get<any>(url, { headers, params }).subscribe((response) => {
      this.resortname.push(response.name);
      this.resortimage.push(response.image_urls)

     console.log(this.resortimage);

      this.fetchResortNames(index + 1);
    });
  }


  getUserName(userIndex: number) {
    if (userIndex >= this.userId.length) {
      this.mergeResortNames();
      return;
    }

    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiI3MDRiYzIwYy00ZTM1LTRjOTYtOTA3ZS1kY2RiYzMwN2UzOGMiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiMDdmOTUyNjAtMmE4Zi00OTgwLWE4ODUtZjllNGFiZmE1NGFkIiwibmJmIjoxNzA5MTg5NjQxLCJleHAiOjE3MDkyNDk2NDEsImlhdCI6MTcwOTE4OTY0MSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Ffbt9fZPcZ3wGX7npqHKZ8ovp5cG86qyjoaA67XgUFQ';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const userid = this.userId[userIndex];
    const userurl = 'https://localhost:7036/api/resorts/userprofile';
    const params = new HttpParams().set('user_id', userid.toString());

    this.http.get<any>(userurl, { headers, params }).subscribe((response) => {
      // console.log(response);

      this.username.push(response.username);
      this.getUserName(userIndex + 1);
    });
  }

  mergeResortNames() {
    this.Bookings_list.forEach((booking, index) => {
      booking.resort_name = this.resortname[index];
    });
    this.Bookings_list.forEach((booking, userindex) => {
      booking.username = this.username[userindex];
    });
    console.log(this.Bookings_list);
  }


  onchange(id: number) {
    debugger;
    const value = {
      booking_id: id,
      approver_id: this.value.value.approver_id
      };
      const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiIyYjc1MDY0ZS1jNzJlLTQxNzUtYTU3My0zODE5OGNiNjljZTAiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiNzIzYjAyYjctOGI2Yi00ZjlmLWI3NmYtNDY3ZmFkZmI2MDc1IiwibmJmIjoxNzA5Mjg3MTk0LCJleHAiOjE3MDkzNDcxOTQsImlhdCI6MTcwOTI4NzE5NCwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Fs0UuenrSnm9_GPXcjQp4RWW06vOMYjxSmFXpbyNvOs';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const url='https://localhost:7036/api/resorts/changeapprover';
    console.log(value)
    debugger;
    this.http
      .put(url,value,{headers})
      .subscribe(
      
        (response) => {
          console.log('Response:', response);
        }
      );
  }

  approver:any[]=[];
  user:any[]=[]
  // selectedApprovers: any[] = [];

  getApprover(){
    const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiIyYjc1MDY0ZS1jNzJlLTQxNzUtYTU3My0zODE5OGNiNjljZTAiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiNzIzYjAyYjctOGI2Yi00ZjlmLWI3NmYtNDY3ZmFkZmI2MDc1IiwibmJmIjoxNzA5Mjg3MTk0LCJleHAiOjE3MDkzNDcxOTQsImlhdCI6MTcwOTI4NzE5NCwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.Fs0UuenrSnm9_GPXcjQp4RWW06vOMYjxSmFXpbyNvOs';
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  const url='https://localhost:7036/api/resorts/getusers';
  this.http.get<any>(url,{headers}).subscribe(
    (response)=>{
      this.user=response
      this.user.forEach((user) => {
        if (user.role === 'Approver') {
          this.approver.push(user);
        }
      });
      console.log(this.approver);

    }
  )


  }

  value=new FormGroup({
    approver_id:new FormControl(0)
  }
  )
  roomTypeId!:number;
  selectt(event: any) {
    debugger;
    this.roomTypeId = event.target.value;
      this.value.patchValue({
        approver_id:this.roomTypeId
      });
  }
 


}
