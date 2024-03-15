import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../core/model/ResortDetails/resortDetails';
import { DateService } from '../../core/service/DateTime';
import { ApiServiceRepo } from '../../core/repository/resort_repository';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-resort-details',
  templateUrl: './resort-details.component.html',
  styleUrls: ['./resort-details.component.scss']
})
export class ResortDetailsComponent implements OnInit {
  resortlist!: ResortDetails;
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
  coordinates: { lat: number, long: number } = { lat:0, long:0 };
  mapUrl!: SafeResourceUrl;

  constructor(private repository:ApiServiceRepo,
    private router:Router,
    private dateService:DateService,
    private route:ActivatedRoute,
    private sanitizer: DomSanitizer) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Resort_id= params['ID'];
      this.booking_id=params['booking_id']
      this.getResortDetails();
      this.coordinates= { lat: 9.932257669035966, long: 76.2706920802446 };
      this.mapUrl = this.generateGoogleMapsUrl();

    });
    this.check_in_date = this.dateService.checkInDate;
    this.check_out_date = this.dateService.checkOutDate;
  }

  getResortDetails(){
    const decrptyId=(atob(this.Resort_id.toString()))
    this.repository.getResortById(decrptyId).subscribe((response) => {
      this.name=response.name;
      response.categories.forEach((category: any) => {
        const capacity = category.number_of_rooms; 
        this.totalCapacity += capacity;
      });

      this.amenities=response.amenities;
      this.img=response.image_urls;
      this.location=response.location;
      this.name=response.name;
      this.description=response.description;
      this.coordinates=response.coordinates;
      console.log("lat:",this.coordinates.lat);
      console.log("long:",this.coordinates.long);
      // const resortDetail = new ResortDetails(
      //   response.resort_id,
      //   response.name,
      //   response.description,
      //   response.location,
      //   response.amenities,
      //   response.image_urls,
      //   response.video_urls,
      //   response.status,
      //   response.created_date,
      //   response.last_modified_date,
      //   response.categories,
      //   response.coordinates

      // );
      // this.resortlist.push(resortDetail);   
     
    });
  }

  generateGoogleMapsUrl(): SafeResourceUrl {
    const url = `https://maps.google.com/maps?hl=en&q=${this.coordinates?.lat},${this.coordinates?.long}&t=k&z=15&ie=UTF8&iwloc=B&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
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
