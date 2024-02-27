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
   public emplyee_id: string,
   public age: string,
   public gender: string,
   public official_id_card_no: string,
   public official_id_image_url: string,
   public claysys_id_card_image_url: string,
   public  allotted_stays: string,
   public used_stays: string,
   public remaining_days: string,
   public status: string,
   public username: string,
   public created_date: string,
   public last_modified_date: string
)
{}
}