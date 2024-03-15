import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getRoomTypes } from '../../Model/RoomTypes/rooms';
import { admin_resort_repository } from '../../Repository/admin_resort_repository';
import { encryptDecrypt } from '../../Service/EncryptDecrypt';
import { ResortService } from '../../Service/resort_details';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrl: './room-list.component.scss'
})

export class RoomListComponent implements OnInit {

  constructor(private repo: admin_resort_repository,
    private encryptiondecryption:encryptDecrypt,
    private RoomService:ResortService,
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

    this.RoomService.addRoom(selectedRoom);
    
    if (selectedRoom) {
      this.router.navigate(['/admin/addroomtype']);
    }
  }

}

