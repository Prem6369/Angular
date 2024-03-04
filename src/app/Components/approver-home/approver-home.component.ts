import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approver-home',
  templateUrl: './approver-home.component.html',
  styleUrl: './approver-home.component.scss'
})
export class ApproverHomeComponent {

constructor(private router:Router){}
  navigateToStatus(){
    this.router.navigate(['/approver/managestatus']);
  }

  navigateToChangeApprover(){
    this.router.navigate(['/approver/changeapprover']);
  }
}
