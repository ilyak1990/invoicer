export class Invoice {
    id: number;
    name: string;
    invoice_date: Date;
    total_cost: number;
    project_name: string;
    current_status_id: number;
    client_email:string;
    client_first_name:string;
    client_last_name:string;
    client_id:number;
    payment_no:number;
    invoice_no:string;
    creator_override:boolean;
    creator_id:number;
    creator_email:string;
    view_code:string;
    viewed_date: Date;
    company_name:string;
    company_img:string;
    company_street:string;
    company_street2:string;
    company_zip:string;
    company_country:string;
    company_city:string;
    company_state:string;
    invoice_status:string;
    notes:string;

}
