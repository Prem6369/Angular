import { Component, OnInit } from '@angular/core';
import { ResortDetails } from '../../core/model/ResortDetails/resortDetails';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { admin_resort_repository } from '../../core/repository/admin_resort_repository';
import { Resort } from '../../core/model/ResortDetails/resortDetails';
@Component({
  selector: 'app-update-resort-details',
  templateUrl: './update-resort-details.component.html',
  styleUrl: './update-resort-details.component.scss'
})
export class UpdateResortDetailsComponent implements OnInit {

  resortlist: ResortDetails[] = [];
  Resort_id!: number;

  constructor(private httpclient: HttpClient, private router: Router,private resort_repo:admin_resort_repository) {

  }
  ngOnInit(): void {
    this.getResortDetails();

  }

  getResortDetails() {
    this.resort_repo.getAllResort().subscribe(
      (result: ResortDetails[]) => {
        this.resortlist = result;
      },
    );
  }

  nextpage(resortId: number) {

    const encryptId = (btoa(resortId.toString()))
    console.log(encryptId)
    this.router.navigate(['/admin/insert_resortdetails'], { queryParams: { ID: encryptId } });
  }

}
