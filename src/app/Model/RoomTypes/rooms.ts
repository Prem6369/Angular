export class getRoomTypes {
constructor(
   public room_type_id: number,
   public name: string,
   public capacity: number,
   public availability: string,
   public description: string,
   public room_type_count: number,
   public created_date: Date,
   public last_modified_date: Date
){}
}

export class addRoomTypes {
   constructor(
      public name: string,
      public capacity: number,
      public description: string,
   ){}
   }
   
   export class RoomResponse {
      constructor(
         booking_id:number,
         public room_type_id: number,
         public name: string,
         public description: string,
         public resort_id: number,
         public room_type_count: number,
      ){}
      }
      
