import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as uuid from 'uuid';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-create-line-item',
  templateUrl: './create-line-item.component.html',
  styleUrls: ['./create-line-item.component.css']
})
export class CreateLineItemComponent implements OnInit {

  rateTypes: string[] = [
    'Flat', 'Hourly'
  ];
  formattedRate:string;
  totalCost:string;
  rate=0

  createIngredient: FormGroup;
  constructor(
    public dialogRef:  MatDialogRef<CreateLineItemComponent>,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private currencyPipe: CurrencyPipe,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createIngredient = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      rate: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]),
      hours: new FormControl(null),
      rate_type: new FormControl(null, [Validators.required]),
      invoice_type: new FormControl(null),
      invoice_name: new FormControl(null),
      invoice_id: new FormControl(0),

    })


  }
  ngOnInit (): void {
    if(this.data){
      for(var att in this.data){
        this.createIngredient.get(att).setValue(this.data[att])
      }
    }
    else{
      this.createIngredient.get('id').setValue(uuid.v4())
    }
  }
  formatNumber(e){
    this.formattedRate = this.currencyPipe.transform(e?.target?.value, 'USD');
    e.target.value = this.formattedRate;
  }
  transformAmount(element){
    this.formattedRate = this.currencyPipe.transform(this.rate, 'USD');
    // Remove or comment this line if you dont want 
    // to show the formatted amount in the textbox.
    element.target.value = this.formattedRate;
}
getTotalCost(){
  const hours = this.createIngredient.get('hours').value ? this.createIngredient.get('hours').value: 0
  const rate = this.createIngredient.get('rate').value ? this.createIngredient.get('rate').value: 0
  const type =this.createIngredient.get('rate_type').value
  const finalCost = type==="Hourly" ? (hours*rate) : rate; 
  

  this.createIngredient.get('cost').setValue(finalCost)//for form field itself
  console.log("setting final cost to " + finalCost)
  this.totalCost = this.currencyPipe.transform(finalCost, 'USD'); //for text field in UI
  console.log("formatted finaly cost " + this.totalCost)
}
  

  submitCreateIngredient() {
    console.log(this.createIngredient.value)
    this.dialogRef.close({data: [this.createIngredient.value]})
    //console.log(this.createIngredient.value)
    this.snackBar.open('Created line item', 'Ok', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'success-snackbar'
    });
  }


  cancelCreateIngredient() {
    this.createIngredient.reset();
    if (this.dialog.openDialogs.length > 0) {
      this.dialogRef.close()
    } 
    this.snackBar.open('Canceled creating a recipe', 'Ok', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'success-snackbar'
    });
  }
  }
