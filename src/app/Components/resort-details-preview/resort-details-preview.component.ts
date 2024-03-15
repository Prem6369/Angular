import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Resort } from '../../core/model/ResortDetails/resortDetails';
import { ResortService } from '../../core/service/resort_details';
import { admin_resort_repository } from '../../core/repository/admin_resort_repository';


@Component({
  selector: 'app-resort-details-preview',
  templateUrl: './resort-details-preview.component.html',
  styleUrl: './resort-details-preview.component.scss'
})
export class ResortDetailsPreviewComponent implements OnInit {

  resort!: Resort;
  amenities: string[] = [];
  categories: any[] = [];
  coordinates: any;


  constructor(private resortService: ResortService,
    private _location: Location,
    private repo: admin_resort_repository) {
  }

  ngOnInit(): void {
    this.resort = this.resortService.getResort();
    this.categories = this.resort.categories;
    this.amenities = this.resort.amenities;
    this.coordinates = this.resort.coordinates;
  }

  removeRoom(room_type_id: number) {
    const index = this.resort.categories.findIndex(room => room.room_type_id === room_type_id);
    if (index !== -1) {
      this.resort.categories.splice(index, 1);
      console.log("Room deleted");
    } else {
      console.error('Room not found with room_type_id:', room_type_id);
    }
  }

  back() {
    this._location.back();
  }

  save() {
    this.resort.categories.forEach((category: any) => {
      delete category.name;
    });

    if (this.resort.resort_id !== 0) {
      this.repo.updateResort(this.resort).subscribe
        ((result) => {
          if (result) {
            alert("Resort updated successfully");
            this.resortService.resetService();
            this._location.back();
          }
        })
    }
    else {
      this.repo.insertResort(this.resort).subscribe
      ((response) => {
        if (response.resort_id !== 0) {
          alert("Resort added successfully");
          this.resortService.resetService();
          this._location.back();
        }
      }
      )
    }
  }
}
