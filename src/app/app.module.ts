import { CurrencyPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { InvoiceReportComponent } from 'src/components/invoice-report/invoice-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceBuilderComponent } from './invoice-builder/invoice-builder.component';
import { MaterialModule } from './material.module';
import { CreateLineItemComponent } from './create-line-item/create-line-item.component';

@NgModule({
  declarations: [
    AppComponent,
    InvoiceReportComponent,
    InvoiceBuilderComponent,
    CreateLineItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule

  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
