export class UserProfile {
   constructor(
       public user_id: number,
       public first_name: string,
       public last_name: string,
       public claySys_email: string,
       public phone_number: string,
       public address: string,
       public role: string,
       public lead: string,
       public employee_id: string,
       public age: number,
       public gender: string,
       public official_id_card_no: string,
       public official_id_image_url: string,
       public claysys_id_card_image_url: string,
       public allotted_stays: number,
       public used_stays: number,
       public remaining_days: number, 
       public status: string,
       public username: string,
   ) {}
}
