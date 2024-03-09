export interface Booking_details {
   bookedRooms: any,
   check_in_date: Date,
   check_out_date: Date,
   days: number,
   employee_user_ids:string,
   nights: number,
   totalSelectedRooms:number,
   members_count: number,
   Total_List: any[]
}

export class UpdatedBooking_details {
constructor(
   public check_in_date: Date,
   public check_out_date: Date,
   public  resort_id:number,
   public roomTypes_Req:any
) {
}
}