import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';
import { DateService } from '../../Service/DateTime';
import { coerceStringArray } from '@angular/cdk/coercion';
import { ApiServiceRepo } from '../../Repository/resort_repository';

@Component({
  selector: 'app-resort-details',
  templateUrl: './resort-details.component.html',
  styleUrls: ['./resort-details.component.scss']
})
export class ResortDetailsComponent implements OnInit {
  resortlist: ResortDetails[] = [];
  img:string='';
  location:string=''
  name:string=''
  description:string='';
  check_in_date!: Date;
  check_out_date!: Date;
  Resort_id!:number;
  totalCapacity: number = 0; 
  amenities:string[]=[];
  booking_id!:number;
  constructor(private repository:ApiServiceRepo,private httpclient: HttpClient,private router:Router,private dateService:DateService,private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Resort_id= params['ID'];
      this.booking_id=params['booking_id']
      this.getf();

    });
    this.check_in_date = this.dateService.checkInDate;
    this.check_out_date = this.dateService.checkOutDate;
  }

  getf(){
    const decrptyId=(atob(this.Resort_id.toString()))

    this.repository.getResortById(decrptyId).subscribe((response) => {
      console.log("newrepo", response);
      this.name=response.name;
      response.categories.forEach((category: any) => {
        const capacity = category.number_of_rooms; 
        this.totalCapacity += capacity;
      });

      this.amenities=response.amenities;
      console.log(this.amenities);

      console.log('Total Capacity:', this.totalCapacity);
      console.log(this.resortlist);
      this.img=response.image_urls;
      this.location=response.location;
      this.name=response.name;
      this.description=response.description;
      const resortDetail = new ResortDetails(
        response.resort_id,
        response.name,
        response.description,
        response.location,
        response.amenities,
        response.image_urls,
        response.video_urls,
        response.status,
        response.created_date,
        response.last_modified_date,
        response.categories,
        response.coordinates
      );
      this.resortlist.push(resortDetail);
      console.log(this.resortlist)
    
        
    });
  }

  booknow() {
    if(this.booking_id){
      this.router.navigate(['/user/Resortrooms'],{queryParams:{ID:this.Resort_id,BookingId:this.booking_id}});
    }else{
      this.router.navigate(['/user/Resortrooms'],{queryParams:{ID:this.Resort_id}});
    }
    
      
  }
  
  change(){
    this.router.navigate(['/user/Resortlist'])
  }

}
