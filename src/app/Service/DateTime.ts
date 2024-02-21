import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class DateService{
    checkInDate!: Date;
  checkOutDate!: Date;
    constructor(){}
}