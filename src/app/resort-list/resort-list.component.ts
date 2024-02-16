import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MAT_DATE_FORMATS } from '@angular/material/core';
 
export const APP_DATE_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MM.YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'MM.YYYY',
  },
};
 
export class ResortLists {
  constructor(
    public resort_id: number,
    public name: string,
    public description: string,
    public location: string,
    public amenities: string[],
    public image_urls: string,
    public video_urls: string,
    public status: string,
    public created_date: string,
    public last_modified_date: string,
    public categories: any[],
    public coordinates: { lat: string, long: string }
  ) {}
}
 
@Component({
  selector: 'app-resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})

export class ResortListComponent implements OnInit {
  @ViewChild('picker') picker!: MatDateRangePicker<Date>;  

  resortlist: ResortLists[] = [];
  rangevalue = new FormGroup({
    check_in_date: new FormControl<Date | null>(new Date(new Date().toUTCString())),
    check_out_date: new FormControl<Date | null>(new Date(new Date().toUTCString())),
  });
  
 
  constructor(private httpclient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getResortDetails();
  }
 
  getResortDetails() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.httpclient.get<any[]>('https://claysysresortapi.claysys.org/api/resorts/getallresorts', { headers })
      .subscribe(
        (response) => {
          console.log(response);
          if (Array.isArray(response)) {
            response.forEach((resortObject) => {
              const newResortDetails = new ResortLists(
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
  
    if (checkInDate && checkOutDate) {
      if (checkInDate < today) {
        alert('Check-in date cannot be in the past. Please select a valid date.');
        this.getResortDetails();
      } else {
        const params = new HttpParams()
          .set('check_in_date', checkInDate.toISOString().split('T')[0])
          .set('check_out_date', checkOutDate.toISOString().split('T')[0]);
  
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  
        this.httpclient.get<any[]>('https://claysysresortapi.claysys.org/api/resorts/getroomavailability', { params, headers })
          .subscribe(
            (response) => {
              console.log(params);
              if (Array.isArray(response)) {
                response.forEach((resortObject) => {
                  const newResortDetails = new ResortLists(
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
                });
              }
            },
            (error) => {
              console.error('Error fetching available resort details:', error);
            }
          );
      }
    }else{
      alert('please select date')
    }
  }
  
  
  nextpage() {
    const checkInDate = this.rangevalue.get('check_in_date')?.value;
    let checkOutDate = this.rangevalue.get('check_out_date')?.value;
  
    if (checkInDate != null && checkOutDate != null) {
      checkOutDate.setDate(checkOutDate.getDate() + 1);
      checkInDate.setDate(checkInDate.getDate() + 1);

      this.router.navigate(['/Resortdetails'], {
        queryParams: {
          checkInDate: checkInDate.toISOString().split('T')[0], 
          checkOutDate: checkOutDate.toISOString().split('T')[0], 
        }
      });
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
