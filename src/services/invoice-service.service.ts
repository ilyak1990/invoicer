import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvoiceItem } from 'src/models/invoice-item.model';
import { Invoice } from 'src/models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  public getInvoiceReportData(invoice_no: string): Observable<any> {

    const invoiceResponse = {
      "id": 0,
      "name": "Myrna Support Contract Work",
      "invoice_date": new Date(),
      "total_cost": 1.00,
      "project_name": "Myrna Support Contract Work",
      "current_status_id": 0,
      "client_email": "myrnamethod@gmail.com",
      "client_first_name": "Myrna",
      "client_last_name": "Hag",
      "client_id": 0,
      "invoice_no": "abcde21",
      "creator_override": false,
      "creator_id": 0,
      "creator_email": "ilyak1990@gmail.com",
      "view_code": "wat",
      "viewed_date": new Date(),
      "company_img": "xyz",
      "company_street": "124 Hampstead Dr",
      "company_street2": "",
      "company_zip": "19002",
      "company_country": "US",
      "company_city": "Ambler",
      "company_state": "PA",
      "invoice_status": "Done"
    } as Invoice
    return of(invoiceResponse)
    // return this.http.get(this.json.apiUrl.concat('/api/invoice/pdf-report/'+invoice_no))
  }

  public getAllInvoiceItems(invoice_no: string): Observable<any> {

    const item1 = {
      "id": 0,
      "name": "Myrna Support Contract Work",
      "invoice_type": "i dunno",
      "rate_type": "type",
      "rate": 1.00,
      "cost": 0.00,
      "hours": 1.5,
      "invoice_id": 0,
      "invoice_name": "invoice name"
    } as InvoiceItem
    const item2 = {
      "id": 0,
      "name": "Myrna Support Contract Work",
      "invoice_type": "i dunno",
      "rate_type": "type",
      "rate": 1.00,
      "cost": 0.00,
      "hours": 1.5,
      "invoice_id": 0,
      "invoice_name": "invoice name"
    } as InvoiceItem
    return of([item1,item2])
    // return this.http.get(this.json.apiUrl.concat('/api/invoice/pdf-report/'+invoice_no))
  }


}
