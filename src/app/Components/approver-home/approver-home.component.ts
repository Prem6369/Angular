import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approver-home',
  templateUrl: './approver-home.component.html',
  styleUrl: './approver-home.component.scss'
})
export class ApproverHomeComponent {

constructor(private router:Router){}


  Approver_list=[
    { Titel:'Resort Booking Status',fav_icon:'fa-solid fa-square-check',navigator:'/approver/managestatus'},
    { Titel:'Change Approver',fav_icon:"fa-solid fa-retweet",navigator:'/approver/changeapprover'}

  ]
}
