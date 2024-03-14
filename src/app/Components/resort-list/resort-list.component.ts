import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';
import { DateService } from '../../Service/DateTime';
import { ApiServiceRepo } from '../../Repository/resort_repository';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resort-list',
  templateUrl: './resort-list.component.html',
  styleUrls: ['./resort-list.component.scss'],
})
export class ResortListComponent implements OnInit {

  resortlist: ResortDetails[] = [];
  Resort_id!: number;
  booking_id!:number;

  rangevalue = new FormGroup({
    check_in_date: new FormControl<Date | null>(
      new Date(new Date().toUTCString())
    ),
    check_out_date: new FormControl<Date | null>(
      new Date(new Date().toUTCString() + 1)
    ),
  });

  constructor(private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private dateService: DateService,
    private repository: ApiServiceRepo) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.rangevalue.patchValue({
      check_out_date: tomorrow,
    });
  }

  ngOnInit(): void {
    this.getResort();
    this.route.queryParams.subscribe(param=>{
      this.booking_id=param['booking_id']
    })
  }


  getResort(){
    this.repository.getAllResort().subscribe(
    (response:any[])=>{
      console.log("new repo calling:",response);
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

        });}
    });
  }


  getAvailableResortDetails() {
    const checkInDate = this.rangevalue.get('check_in_date')?.value;
    const checkOutDate = this.rangevalue.get('check_out_date')?.value;
    const today = new Date();
    today.setDate(today.getDate() - 1);

    if (checkInDate && checkOutDate) {
      if (checkInDate < today) {
        alert(
          'Check-in date cannot be in the past. Please select a valid date.'
        );
        this.getResort();
      } else {
      this.repository.getAvailableResort(checkInDate, checkOutDate).subscribe((response) => {
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
        }})
      }
    } else {
      alert('please select date');
    }
  }

  nextpage(resortId: number) {
    const checkInDate = this.rangevalue.get('check_in_date')?.value;
    const checkOutDate = this.rangevalue.get('check_out_date')?.value;
    const encryptId=(btoa(resortId.toString()));


    if (this.booking_id) {
      if (checkInDate != null && checkOutDate != null) {
        this.dateService.checkInDate = checkInDate;
        this.dateService.checkOutDate = checkOutDate;
        this.router.navigate(['/user/Resortdetails'], { queryParams: { ID: encryptId,booking_id:this.booking_id } });
      }
    }
    else
    {
      debugger;
    if (checkInDate != null && checkOutDate != null) {
      this.dateService.checkInDate = checkInDate;
      this.dateService.checkOutDate = checkOutDate;

      this.router.navigate(['/user/Resortdetails'], { queryParams: { ID: encryptId } });
    } else {
      console.error('Check-in date or check-out date is null or undefined.');
    }
  }
}


  clearDates() {
    this.rangevalue.reset();
    this.resortlist = [];
    this.getResort();
  }

  applyFilter() {
    this.resortlist = [];
    this.getAvailableResortDetails();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
}
