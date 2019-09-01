import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-numeric-editor',
  templateUrl: './numeric-editor.component.html'
})
export class NumericEditorComponent {

  formGroup: FormGroup;
  key;
  private value;
  columnName: string;
  private params;

  agInit(params: any) {
    this.params = params;
    this.columnName = params.column.colDef.headerName;
    this.key = params.context.createFormControlName(params.node.id, params.column);
    this.value = params.value;
  }

  refresh(params: any): boolean {
    this.formGroup = params.context.formGroup;

    // this could also be done in GridComponent.createFormControls, but the cell component could be doing something
    // with the value, so it feels more natural that the control value be set here
    this.formGroup.controls[this.key].patchValue(this.value);
    return true;
  }

  onChange(event: Event): void {
    event.stopPropagation();
    this.params.onValueUpdate({
      index: this.params.node.id,
      side: this.params.side
    });
  }

}
