import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as pdfMake  from "pdfmake/build/pdfmake";
import * as pdfFontsX from 'pdfmake-unicode/dist/pdfmake-unicode.js';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

pdfMake.vfs = pdfFontsX.pdfMake.vfs;


// const pdfMakeX = import * 'pdfmake/build/pdfmake.js';
// const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
// pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;


import { ReportPdfService } from 'src/services/report-pdf.service';

@Component({
  selector: 'app-invoice-report',
  templateUrl: './invoice-report.component.html',
  styleUrls: ['./invoice-report.component.css']
})

export class InvoiceReportComponent implements AfterViewInit {

  @ViewChild('exportthis') myDiv: ElementRef;
  //@ViewChild('sPad',{static:true}) signaturePadElement;
  //signaturePad:any;
  pdfDocGenerator: any;
  dataLoaded = false;
  isCreator = false;
  viewCodeConfirmed = false;
  fireAfterInit = false;
  invoice_no = "0";

  constructor(private router: Router,public dialog: MatDialog, private reportPdfService: ReportPdfService ) {
    this.router = router;
    this.reportPdfService=reportPdfService;
    pdfMake.vfs = pdfFontsX.pdfMake.vfs;
    
  }

  ngAfterViewInit(): void {
    var splitURL = this.router.url.split('/')
    this.invoice_no = "0"
    console.log(this.invoice_no + ' no# being passed into appendReport')
    this.appendReport(this.myDiv.nativeElement);
  }

  appendReport(htmlElement: any) {
    console.log(htmlElement)
    //html2canvas(htmlElement).then(canvas => {
     this.reportPdfService.getInvoiceReportPdf(this.invoice_no).then((data:any)=>{
       //console.log(JSON.stringify(data) + " data? ")
      var docDefinition=data;
      console.log(data)
     // console.log("docDefinition IN INVOICE-REPORT "+ docDefinition)
      pdfMake.createPdf(docDefinition).getDataUrl((dataUrl:any) => {
        console.log(dataUrl,"?")
      //  console.log("firing in pdf make jawn")
        const targetElement = document.querySelector('#reportpdf');
        const iframe = document.createElement('iframe');
        iframe.src = dataUrl;
        iframe.setAttribute('height', '750px');
        iframe.setAttribute('width', '95%');
        targetElement?.appendChild(iframe);
        this.dataLoaded = true;
       // this.currentInvoice=this.reportPdfService.currentInvoice;
       // console.log(JSON.stringify(this.currentInvoice) + " ???")
      });
    });

   // });

  }
}
