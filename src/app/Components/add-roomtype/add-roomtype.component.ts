import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { admin_room_repository } from '../../Repository/admin_room_repository';

@Component({
  selector: 'app-add-roomtype',
  templateUrl: './add-roomtype.component.html',
  styleUrls: ['./add-roomtype.component.scss']
})
export class AddRoomtypeComponent implements OnInit {
  roomsTypes: any;
  successMessage: boolean = false;
  updateMessage: boolean = false;

  roomId!: number;

  constructor(
    private repo: admin_room_repository,
    private _location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.roomId = params['room_type_id'];
      if (params && Object.keys(params).length !== 0) {
        this.AddRooms.patchValue({
          ['name']: params['name'],
          ['capacity']: params['capacity'],
          ['description']: params['description']
        });
      }
    });
    this.AddRooms.patchValue({
      room_type_id: this.roomId
    })

  }

  AddRooms = new FormGroup({
    room_type_id: new FormControl(),
    name: new FormControl('', Validators.required),
    capacity: new FormControl(),
    description: new FormControl('', Validators.required)
  });

  saveRoom() {
    if (this.roomId !== 0 && this.roomId !== undefined) {
        this.repo.updateRoom(this.AddRooms.value)
        .subscribe(response => {
          if (response !== null) {
            this.updateMessage = true;
            this.AddRooms.reset();
          }

        });
    } else {
      debugger;
      this.repo.insertRoom(this.AddRooms.value)
        .subscribe(response => {
          if (response !== null) {
          this.successMessage = true;
          this.AddRooms.reset();
        }
        });
    }
  }


  back() {
    this._location.back();
  }
}
