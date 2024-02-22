import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';
import { DateService } from '../../Service/DateTime';

@Component({
  selector: 'app-resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.scss'],
})
export class ResortListComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  Resort_id!: number;


  rangevalue = new FormGroup({
    check_in_date: new FormControl<Date | null>(
      new Date(new Date().toUTCString())
    ),
    check_out_date: new FormControl<Date | null>(
      new Date(new Date().toUTCString() + 1)
    ),
  });

  constructor(private httpclient: HttpClient, private router: Router,private dateService: DateService) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.rangevalue.patchValue({
      check_out_date: tomorrow,
    });
  }

  ngOnInit(): void {
    this.getResortDetails();
  }

  getResortDetails() {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpclient
      .get<any[]>(
        'https://claysysresortapi.claysys.org/api/resorts/getallresorts',
        { headers }
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (Array.isArray(response)) {
            response.forEach((resortObject) => {
              const newResortDetails = new ResortDetails(
                resortObject.resort_id,
                resortObject.name,
                resortObject.description,
                resortObject.location,
                resortObject.amenities,
                resortObject.image_urls,
                resortObject.video_urls,
                resortObject.status,
                resortObject.created_date,
                resortObject.last_modified_date,
                resortObject.categories,
                resortObject.coordinates
              );
              this.resortlist.push(newResortDetails);
              this.Resort_id=resortObject.resort_id

            });
          } else {
            console.error('Response is not an array.');
          }
        },
        (error) => {
          console.error('Error fetching resort details:', error);
        }
      );
  }

  getAvailableResortDetails() {
    const checkInDate = this.rangevalue.get('check_in_date')?.value;
    const checkOutDate = this.rangevalue.get('check_out_date')?.value;
    const today = new Date();
    console.log(checkInDate, checkOutDate);

    if (checkInDate && checkOutDate) {
      if (checkInDate < today) {
        alert(
          'Check-in date cannot be in the past. Please select a valid date.'
        );
        this.getResortDetails();
      } else {
        const params = new HttpParams()
          .set('check_in_date', checkInDate.toISOString().split('T')[0])
          .set('check_out_date', checkOutDate.toISOString().split('T')[0]);

        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
        const headers = new HttpHeaders().set(
          'Authorization',
          'Bearer ' + token
        );

        this.httpclient
          .get<any[]>(
            'https://claysysresortapi.claysys.org/api/resorts/getroomavailability',
            { params, headers }
          )
          .subscribe((response) => {
            
            if (Array.isArray(response)) {
              response.forEach((resortObject) => {
                const newResortDetails = new ResortDetails(
                  resortObject.resort_id,
                  resortObject.name,
                  resortObject.description,
                  resortObject.location,
                  resortObject.amenities,
                  resortObject.image_urls,
                  resortObject.video_urls,
                  resortObject.status,
                  resortObject.created_date,
                  resortObject.last_modified_date,
                  resortObject.categories,
                  resortObject.coordinates
                );
                this.Resort_id=resortObject.resort_id
                this.resortlist.push(newResortDetails);
              });
            }
          });
      }
    } else {
      alert('please select date');
    }
  }

  nextpage(resortId: number) {
    const checkInDate = this.rangevalue.get('check_in_date')?.value;
    const checkOutDate = this.rangevalue.get('check_out_date')?.value;

    if (checkInDate != null && checkOutDate != null) {
        this.dateService.checkInDate = checkInDate;
        this.dateService.checkOutDate = checkOutDate;

<<<<<<< HEAD
        this.router.navigate(['/Resortdetails'], { queryParams: { ID: resortId } });
=======
     this.router.navigate(['/Resortdetails']);
>>>>>>> a6d506a26c7d8a48a93291348a431b5f9e993be1
    } else {
        console.error('Check-in date or check-out date is null or undefined.');
    }
}


  clearDates() {
    this.rangevalue.reset();
    this.resortlist = [];
    this.getResortDetails();
  }

  applyFilter() {
    this.resortlist = [];
    this.getAvailableResortDetails();
  }
}
