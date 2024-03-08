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

export interface UpdatedBooking_details {

   check_in_date: Date,
   check_out_date: Date,
   resort_id:number,
   roomTypes_Req:any
}