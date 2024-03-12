import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getRoomTypes } from '../../Model/RoomTypes/rooms';
import { admin_resort_repository } from '../../Repository/admin_resort_repository';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})

export class RoomListComponent implements OnInit {

  constructor(private repo: admin_resort_repository,
    private router: Router) { }

  room: getRoomTypes[] = [];

  ngOnInit() {
    this.getAllRooms();
  }


  getAllRooms() {
    this.repo.getAllRoom().subscribe(
      (response) => {
        this.room = response;
      }
    )
  }

  navigate(roomTypeId: number) {
    const selectedRoom = this.room.find(room => room.room_type_id === roomTypeId);
    if (selectedRoom) {
      this.router.navigate(['/admin/addroomtype'], { queryParams: selectedRoom });
    }
  }

}

