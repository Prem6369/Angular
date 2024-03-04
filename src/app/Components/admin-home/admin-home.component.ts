import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {

  function_list = [
    {fun_name: 'Add Room type', fun_icon: 'fa-solid fa-house', fun_navigation: '/admin/addroomtype'},
    {fun_name: 'Add Resort Details', fun_icon: 'fa-solid fa-hotel', fun_navigation: '/admin/insert_resortdetails'},
  ];
  
   getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
}
