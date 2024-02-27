export class Booking{
    constructor(
    public user_id: number,
    public first_name: string,
    public last_name: string,
    public claySys_email: string,
    public phone_number: string,
    public address: string,
    public age: number,
    public allotted_stays: number,
    public bookings: any[], 
    public claysys_id_card_image_url: string,
    public created_date: string,
    public employee_id: string,
    public gender: string,
    public last_modified_date: string,
    public lead: string,
    public official_id_card_no: string,
    public official_id_image_url: string,
    public remaining_days: number,
    public role: string,
    public status: string,
    public used_stays: number,
    public username: string
    ){}
}