import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent {
  function_list = [
    {
      fun_name: 'Add Resort',
      fun_icon: 'fa-solid fa-hotel',
      fun_navigation: '/admin/insert_resortdetails',
    },
    {
      fun_name: 'Add Room',
      fun_icon: 'fa-solid fa-house',
      fun_navigation: '/admin/addroomtype',
    },
    {
      fun_name: 'Update Resort ',
      fun_icon: 'fa-solid fa-hotel',
      fun_navigation: '/admin/resort-details-update',
    },
    {
      fun_name: 'Update Room ',
      fun_icon: 'fa-solid fa-house',
      fun_navigation: '/admin/roomlist',
    },
  ];
}
