import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InvoiceItem } from 'src/models/invoice-item.model';
import { Invoice } from 'src/models/invoice.model';
import { InvoiceService } from './invoice-service.service';


@Injectable({
  providedIn: 'root'
})
export class ReportPdfService {
  currentInvoice: Invoice;
  currentInvoiceItems:InvoiceItem[];
  pdfContent:any;
  isCreator = false;

  constructor(private invoiceService: InvoiceService, private router:Router, private currencyPipe:CurrencyPipe) {
    this.invoiceService = invoiceService;
    this.router = router;

  }

    getInvoiceReportPdf(invoice_no:string):Promise<any>{
      return new Promise(resolve=>{ this.invoiceService.getInvoiceReportData(invoice_no).subscribe(
      (response) => {
        if (response) {
          this.isCreator = (localStorage['currentUser'] !== undefined) ? localStorage['currentUser'].id === response.result.creator_id : false;
          this.currentInvoice = response.result;
  
          this.invoiceService.getAllInvoiceItems(this.currentInvoice.invoice_no).subscribe(
            (itemResponse) => {
              if (itemResponse) {
                this.currentInvoiceItems=itemResponse.result;
                resolve(this.generatePDF(this.currentInvoice,this.currentInvoiceItems))

              }
            }
          )
          
       //resolve(this.generatePDF(this.currentInvoice,this.currentInvoiceItems))
      }
      })

    })

  }
  buildItemsJson(items:InvoiceItem[]):any{
    const finalResult={}
    var individualItems = [];  

    if(items){
    var individualItems:any[] = [];  
    var firstArry:any[] = [];
    var secArry:any[] = [];
    var thirdArry:any[] = [];
    var fourthArry:any[] = [];

    for(var i = 0; i < items.length; i++) {
      var obj = items[i];
      let totalCost;
      if(obj.rate_type==='Flat'){
        totalCost=obj.rate
      }
      else{
        totalCost=(obj.hours*obj.rate)
      }
      totalCost=this.currencyPipe.transform(Number(totalCost), 'USD', 'symbol', '1.2-2');

      firstArry.push({"text":obj.name,"border": [false, false, false, true], "margin":[0, 5, 0, 5], "alignment":"left", })
      secArry.push({"text":obj.hours,"border": [false, false, false, true], "margin":[0, 5, 0, 5], "alignment":"center", },)
      thirdArry.push({"text":obj.rate,"border": [false, false, false, true], "margin":[0, 5, 0, 5], "alignment":"center", },)
      fourthArry.push({"text":totalCost,"border": [false, false, false, true], "margin":[0, 5, 0, 5], "alignment":"right","fillColor": '#f5f5f5', })


  }
  individualItems.push(firstArry);
  individualItems.push(secArry);
  individualItems.push(thirdArry);
  individualItems.push(fourthArry);

  
    }
    return individualItems;

  }

   generatePDF(invoice:Invoice,invoiceItems:InvoiceItem[]) {
    //invoice = invoice
 const isPaid=(invoice.payment_no!==null && invoice.payment_no!==undefined)
 const totalCost=this.currencyPipe.transform(Number(invoice.total_cost), 'USD', 'symbol', '1.2-2');

 var individualItems =  this.buildItemsJson(invoiceItems);

 console.log(invoice, " INVOICE")

    return {
      content: [
        {
          columns: [
            {
              image: invoice.company_img,
              width: 150,
            },
            [
              {
                text: 'Invoice',
                color: '#333333',
                width: '*',
                fontSize: 28,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 15],
              },
              {
                stack: [
                  {
                    columns: [ //loop payments
                      {
                        text: 'Invoice No.',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: invoice.invoice_no,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Date Issued',
                        color: '#aaaaab',
                        bold: true,
                        width: '*',
                        fontSize: 12,
                        alignment: 'right',
                      },
                      {
                        text: invoice.invoice_date,
                        bold: true,
                        color: '#333333',
                        fontSize: 12,
                        alignment: 'right',
                        width: 100,
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        text: 'Status',
                        color: '#aaaaab',
                        bold: true,
                        fontSize: 12,
                        alignment: 'right',
                        width: '*',
                      },
                      {
                        text: invoice.invoice_status,
                        bold: true,
                        fontSize: 14,
                        alignment: 'right',
                        color: 'green',
                        width: 100,
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          columns: [
            {
              text: 'From',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
            {
              text: 'To',
              color: '#aaaaab',
              bold: true,
              fontSize: 14,
              alignment: 'left',
              margin: [0, 20, 0, 5],
            },
          ],
        },
        {
          columns: [
            {
              text: invoice.company_name ,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
            {
              text: invoice.client_first_name + " " +invoice.client_last_name ,
              bold: true,
              color: '#333333',
              alignment: 'left',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Address',
              color: '#aaaaab',
              bold: true,
              margin: [0, 7, 0, 3],
            },
          ],
        },
        {
          columns: [
            {
              text: invoice.company_street + " " +invoice.company_street2 + " \n " + invoice.company_city + ", " + invoice.company_state + " \n" + invoice.company_zip +" \n" + invoice.company_country,
              style: 'invoiceBillingAddress',
            },
          ],
        },
        '\n\n',
        {
          width: '100%',
          alignment: 'center',
          text: 'Line Items',
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 15,
        },
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              if (i === 1 || i === 0) {
                return '#bfdde8';
              }
              return '#eaeaea';
            },
            vLineColor: function (i, node) {
              return '#eaeaea';
            },
            hLineStyle: function (i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 2;
            },
            paddingBottom: function (i, node) {
              return 2;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 80,80,80],
            body: [
              [
                {
                  text: 'DESCRIPTION',
                  fillColor: '#eaf2f5',
                  alignment:"left",
                  border: [false, true, false, true],
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'HOURS',
                  border: [false, true, false, true],
                  alignment: 'center',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'RATE',
                  border: [false, true, false, true],
                  alignment: 'center',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
                {
                  text: 'TOTAL',
                  border: [false, true, false, true],
                  alignment: 'right',
                  fillColor: '#eaf2f5',
                  margin: [0, 5, 0, 5],
                  textTransform: 'uppercase',
                },
              ],
              individualItems.map(function(item) {
                return item;
            }),
            ],
          }, //individual items table
        },
        '\n',
        '\n\n',
        {
          layout: {
            defaultBorder: false,
            hLineWidth: function (i, node) {
              return 1;
            },
            vLineWidth: function (i, node) {
              return 1;
            },
            hLineColor: function (i, node) {
              return '#eaeaea';
            },
            vLineColor: function (i, node) {
              return '#eaeaea';
            },
            hLineStyle: function (i, node) {
              // if (i === 0 || i === node.table.body.length) {
              return null;
              //}
            },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            paddingLeft: function (i, node) {
              return 10;
            },
            paddingRight: function (i, node) {
              return 10;
            },
            paddingTop: function (i, node) {
              return 3;
            },
            paddingBottom: function (i, node) {
              return 3;
            },
            fillColor: function (rowIndex, node, columnIndex) {
              return '#fff';
            },
          },
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              [
                {
                  text: 'Payment Subtotal',
                  border: [false, true, false, true],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  border: [false, true, false, true],
                  text:  totalCost,
                  alignment: 'right',
                  fillColor: '#f5f5f5',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Payment Processing Fee',
                  border: [false, false, false, true],
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
                {
                  text: '$0.00',
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  alignment: 'right',
                  margin: [0, 5, 0, 5],
                },
              ],
              [
                {
                  text: 'Total Amount',
                  bold: true,
                  fontSize: 20,
                  alignment: 'right',
                  border: [false, false, false, true],
                  margin: [0, 5, 0, 5],
                },
                {
                  text: "USD "+ totalCost,
                  bold: true,
                  fontSize: 20,
                  alignment: 'right',
                  border: [false, false, false, true],
                  fillColor: '#f5f5f5',
                  margin: [0, 5, 0, 5],
                },
              ],
            ],
          },
        },
        '\n\n',
        {
          text: 'NOTES',
          style: 'notesTitle',
        },
        {
          text: invoice.notes,
          style: 'notesText',
        },
      ],
      styles: {
        notesTitle: {
          fontSize: 10,
          bold: true,
          margin: [0, 50, 0, 3],
        },
        notesText: {
          fontSize: 10,
        },
      },
      defaultStyle: {
        columnGap: 20,
        //font: 'Quicksand',
      },
    };

    //this.pdfDocGenerator=pdfMake.createPdf(docDefinition);

  }
}
