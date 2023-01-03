import { SelectionModel } from '@angular/cdk/collections';
import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { CreateLineItemComponent } from '../create-line-item/create-line-item.component';
import * as uuid from 'uuid';
@Component({
  selector: 'app-invoice-builder',
  templateUrl: './invoice-builder.component.html',
  styleUrls: ['./invoice-builder.component.css']
})
export class InvoiceBuilderComponent implements OnInit {
  
  reportData:any
  createInvoice: FormGroup;
  displayedColumns: string[] = [
    "name",
    "invoice_date",
    "total_cost",
    "project_name",
    "current_status_id",
    "client_email",
    "client_first_name",
    "client_last_name",
    "client_id",
    "invoice_no",
    "creator_override",
    "creator_id",
    "creator_email",
    "company_name",
    "company_street",
    "company_img",   
    "company_street2",
    "company_zip",
    "company_country",
    "company_city",
    "company_state",
    "invoice_status"
  ];
  selection = new SelectionModel<any>(true, []);
  dataSourceLineItem = new MatTableDataSource<any>();
  lineItemColumns: string[] = [
    "name",
    "rate_type",
    "rate",
    "cost",
    "hours",
    "action"
  ];
  totalCost:string="";
  constructor(private renderer:Renderer2, private formBuilder: FormBuilder,  public dialog: MatDialog,  private snackBar: MatSnackBar, private currencyPipe: CurrencyPipe) {
    const generatedUUID = uuid.v4()
    this.createInvoice = new FormGroup({
      id: new FormControl(generatedUUID),
      name: new FormControl(null, [Validators.required]),
      invoice_date: new FormControl(new Date(), [Validators.required]),
      total_cost: new FormControl(null, [Validators.required]),
      project_name: new FormControl(null, [Validators.required]),
      current_status_id: new FormControl(null, [Validators.required]),
      client_email: new FormControl(null, [Validators.required]),
      client_first_name: new FormControl(null, [Validators.required]),
      client_last_name: new FormControl(null, [Validators.required]),
      client_id: new FormControl(null, [Validators.required]),
      invoice_no: new FormControl(generatedUUID, [Validators.required, Validators.min(0)]),
      creator_override: new FormControl(false, [Validators.required]),
      creator_id: new FormControl(0, [Validators.required]),
      creator_email: new FormControl("ilyak1990@gmail.com", [Validators.required]),
      company_name: new FormControl("Camel Software", [Validators.required]),
      company_street: new FormControl("124 Hampstead Drive", [Validators.required]),
      company_img: new FormControl("data:image/png;base64,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", [Validators.required]),
      company_street2: new FormControl("", [Validators.required]),
      company_zip: new FormControl("19002", [Validators.required]),
      company_country: new FormControl("US", [Validators.required]),
      company_city: new FormControl("Ambler", [Validators.required]),
      company_state: new FormControl("PA", [Validators.required]),
      invoice_status: new FormControl(null, [Validators.required]),
      line_items: new FormArray([], [Validators.required]),
    });
  }
  ngOnInit(): void {
  
  }

  @ViewChild('one', { static: false }) d1: ElementRef;

  ngAfterViewInit() {

}
createNewInvoice(){
  console.log("create new invoice fired")
  this.reportData = this.createInvoice.value
}
getTotalCost(){
  const lineItems = this.createInvoice.get('line_items') as FormArray
  const sum = lineItems.controls.reduce(function summarize(sum, line_item) {
    return sum + line_item.value.cost;
  }, 0);

  this.createInvoice.get('total_cost').setValue(sum)
  this.totalCost = this.currencyPipe.transform(sum, 'USD');

  console.log(sum  +  " total calculated sum")
  console.log(this.totalCost +  ' formatted total cost')

  
}
editLineItem(element) {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '85%';
  dialogConfig.height = '50%';
  dialogConfig.data = element.value;
  const dialogRef = this.dialog.open(
    CreateLineItemComponent,
    dialogConfig
  );
  dialogRef.afterClosed().subscribe((response) => {
    if (response) {
      let line_items = this.createInvoice.get(
        'line_items'
      ) as FormArray;

      response.data.forEach((line_item) => {
        const index = line_items.controls.findIndex(x =>  x.get('id').value === line_item.id);
        line_items.at(index).patchValue({
            id: line_item.id, //maybe in future
            name: line_item.name,
            invoice_type: '',//maybe in future
            rate_type: line_item.rate_type,
            rate: line_item.rate,
            cost: line_item.cost,
            hours: line_item.hours,
            invoice_id: 0, //maybe in future
            invoice_name: '', //maybe in future
      });
      });
      // this.ingredientCHANGED = (this.originalRecipe !== ingredients.value);
      this.createInvoice.markAsDirty();
      this.dataSourceLineItem = new MatTableDataSource(
        (this.createInvoice.get('line_items') as FormArray).controls
      );
      this.getTotalCost()
    }
  });
}
createLineItem() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = '85%';
  dialogConfig.height = '50%';
  const dialogRef = this.dialog.open(
    CreateLineItemComponent,
    dialogConfig
  );
  dialogRef.afterClosed().subscribe((response) => {
    if (response) {
      let line_items = this.createInvoice.get(
        'line_items'
      ) as FormArray;

      response.data.forEach((line_item) => {
        line_items.push(
          this.formBuilder.group({
            id: line_item.id, //maybe in future
            name: line_item.name,
            invoice_type: '',//maybe in future
            rate_type: line_item.rate_type,
            rate: line_item.rate,
            cost: line_item.cost,
            hours: line_item.hours,
            invoice_id: 0, //maybe in future
            invoice_name: '', //maybe in future
          })
        );
      });
      // this.ingredientCHANGED = (this.originalRecipe !== ingredients.value);
      this.createInvoice.markAsDirty();
      this.dataSourceLineItem = new MatTableDataSource(
        (this.createInvoice.get('line_items') as FormArray).controls
      );
      this.getTotalCost()
    }
  });

}
cancelCreateInvoice() {
  this.createInvoice.reset();
  this.snackBar.open('Canceled creating a recipe', 'Ok', {
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: 'success-snackbar'
  });


}

  /** Row selection html. */

removeSelected() {
  this.selection.selected.forEach((item) => {
    let index: number = this.dataSourceLineItem.data.findIndex(
      (d) => d === item
    );
    this.dataSourceLineItem.data.splice(index, 1);
    this.dataSourceLineItem.data = this.dataSourceLineItem.data;
    let ingredients = this.createInvoice.get(
      'line_items'
    ) as FormArray;
    ingredients.removeAt(index);
  });
  this.selection = new SelectionModel<Element>(true, []);
}
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSourceLineItem.data.length;
  return numSelected === numRows;
}

checkboxLabel(row?: any): string {
  if (!row) {
    return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
    row.position + 1
  }`;
}
masterToggle() {
  if (this.isAllSelected()) {
    this.selection.clear();
    return;
  }

  this.selection.select(...this.dataSourceLineItem.data);
}
}