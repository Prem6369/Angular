import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResortDetails } from '../../Model/ResortDetails/resortDetails';
import { DateService } from '../../Service/DateTime';
import { coerceStringArray } from '@angular/cdk/coercion';

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
  constructor(private httpclient: HttpClient,private router:Router,private routing:ActivatedRoute,private dateService:DateService,private route:ActivatedRoute) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Resort_id= params['ID'];
      this.getResortDetails();

    });
    this.check_in_date = this.dateService.checkInDate;
    this.check_out_date = this.dateService.checkOutDate;
  }

  getResortDetails() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaWQiOiJlODhiZTMyNS04NjU2LTQ3NzYtOGQ2MS1iMmY2OWRiYmE2ZTUiLCJzdWIiOiJhcmF2aW5kIiwiZW1haWwiOiJhcmF2aW5kIiwianRpIjoiYTUzZDg3MDQtZjc1Ni00MzRmLWI0ZTYtOWNmNzE1MTJjMTM3IiwibmJmIjoxNzA3NTgwODk5LCJleHAiOjE3MDc2NDA4OTksImlhdCI6MTcwNzU4MDg5OSwiaXNzIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIiwiYXVkIjoiaHR0cHM6Ly9jbGF5c3lzcmVzb3J0YXBpLmNsYXlzeXMub3JnIn0.NIUOGTlkzAKUbverhL5hXB5l9MFysGlUJhvy50MT5Z4';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const decrptyId=(atob(this.Resort_id.toString()))
    const params=new HttpParams().set('resort_id',decrptyId)
    this.httpclient.get<any>(`https://claysysresortapi.claysys.org/api/resorts/getresortdetails`, { headers,params })
      .subscribe(
        (response) => {
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
        
        }
      );
  }
  booknow() {

    this.router.navigate(['/user/Resortrooms'],{queryParams:{ID:this.Resort_id}});
      
  }
  
  change(){
    this.router.navigate(['Resortlist'])
  }

}
