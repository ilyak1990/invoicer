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
      "invoice_no": "abcde21",
      "creator_override": false,
      "creator_id": 0,
      "creator_email": "ilyak1990@gmail.com",
      "view_code": "wat",
      "viewed_date": new Date(),
      "company_img": "data:image/jpeg;base64,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",
      "company_street": "124 Hampstead Dr",
      "company_street2": "",
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
      "name": "Myrna Support Contract Work",
      "invoice_type": "i dunno",
      "rate_type": "type",
      "rate": 1.00,
      "cost": 0.00,
      "hours": 1.5,
      "invoice_id": 0,
      "invoice_name": "invoice name"
    },
    {
      "id": 0,
      "name": "Myrna Support Contract Work",
      "invoice_type": "i dunno",
      "rate_type": "type",
      "rate": 1.00,
      "cost": 0.00,
      "hours": 1.5,
      "invoice_id": 0,
      "invoice_name": "invoice name"
    }]})
    // return this.http.get(this.json.apiUrl.concat('/api/invoice/pdf-report/'+invoice_no))
  }


}
