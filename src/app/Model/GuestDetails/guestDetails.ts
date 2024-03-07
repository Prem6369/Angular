export class GuestDetails {
  constructor(
   public first_name: string,
   public last_name: string,
   public age: number,
   public email: string,
   public referrer_user_id:number,
   public gender: string,
   public phone_number: number,
   public address: string,
   public official_id_card_no: string,
   public official_id_image_url: string,
   public type:string
  ) {}
  }

  export class GuestPost{
    constructor(
     public first_name: string,
     public last_name: string,
     public age: number,
     public email: string,
     public referrer_user_id:number,
     public gender: string,
     public phone_number: number,
     public address: string,
     public official_id_card_no: string,
     public official_id_image_url: string,
    ) {}
    }
  
    export class GuestRespose{
      constructor(
        public guest_user_id:number,
       public first_name: string,
       public last_name: string,
       public age: number,
       public email: string,
       public referrer_user_id:number,
       public gender: string,
       public phone_number: number,
       public address: string,
       public official_id_card_no: string,
       public official_id_image_url: string,
      ) {}
      }
    