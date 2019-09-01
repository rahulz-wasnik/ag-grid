import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent {

  formGroup: FormGroup;
  key;
  private value;
  columnName: string;

  agInit(params: any) {
    this.columnName = params.column.colDef.headerName;
    this.key = params.context.createKey(params.node.id, params.column);
    this.value = params.value;
  }

  refresh(params: any): boolean {
    this.formGroup = params.context.formGroup;

    // this could also be done in GridComponent.createFormControls, but the cell component could be doing something
    // with the value, so it feels more natural that the control value be set here
    this.formGroup.controls[this.key].patchValue(this.value);
    return true;
  }

}
