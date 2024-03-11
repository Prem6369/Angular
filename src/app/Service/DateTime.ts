import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class DateService{
    checkInDate!: Date;
  checkOutDate!: Date;
    constructor(){}

    addCheckin(check_in_date:Date)
    {
      debugger;
      this.checkInDate=check_in_date;
    }

    addCheckout(check_out_date:Date)
    {
      this.checkOutDate=check_out_date;
    }

    getCheckin():Date{
      return this.checkInDate;
    }

    getCheckout():Date{
      return this.checkOutDate;
    }
}