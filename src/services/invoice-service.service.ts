import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InvoiceItem } from 'src/models/invoice-item.model';
import { Invoice } from 'src/models/invoice.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor() { }

  public getInvoiceReportData(invoice_no: string): Observable<any> {

    return of({result:{ 
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
      "invoice_no": uuidv4().substring(0,24),
      "creator_override": false,
      "creator_id": 0,
      "creator_email": "ilyak1990@gmail.com",
      "view_code": "wat",
      "viewed_date": new Date(),
      "company_name":"Camel Software",
      "company_street":"124 Hampstead Drive",
      "company_img":"data:image/png;base64,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",      "company_street2": "",
      "company_zip": "19002",
      "company_country": "US",
      "company_city": "Ambler",
      "company_state": "PA",
      "invoice_status": "Done"
    }})
    // return this.http.get(this.json.apiUrl.concat('/api/invoice/pdf-report/'+invoice_no))
  }

  public getAllInvoiceItems(invoice_no: string): Observable<any> {

    return of({result:[{
      "id": 0,
      "name": "Myrna Support (08/05)",
      "invoice_type": "i dunno",
      "rate_type": "type",
      "rate": 60.00,
      "cost": 0.00,
      "hours": 3,
      "invoice_id": 0,
      "invoice_name": "invoice name"
    },
    {
      "id": 0,
      "name": "Myrna Support (08/10)",
      "invoice_type": "i dunno",
      "rate_type": "type",
      "rate":  60.00,
      "cost": 0.00,
      "hours": 3,
      "invoice_id": 0,
      "invoice_name": "invoice name"
    },
    {
      "id": 0,
      "name": "User table and ability to reset passwords",
      "invoice_type": "i dunno",
      "rate_type": "type",
      "rate": 60.00,
      "cost": 0.00,
      "hours": 1,
      "invoice_id": 0,
      "invoice_name": "invoice name"
    }]})
    // return this.http.get(this.json.apiUrl.concat('/api/invoice/pdf-report/'+invoice_no))
  }


}
