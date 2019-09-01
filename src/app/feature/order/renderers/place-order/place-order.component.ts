import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html'
})
export class PlaceOrderComponent {

  private params;
  key;
  formGroup: FormGroup;

  constructor() { }

  agInit(params: any) {
    this.params = params;
    this.key = params.context.createFormControlName(params.node.id, params.column);
  }

  refresh(params: any): boolean {
    // this.formGroup = params.context.formGroup;
    return true;
  }

  placeOrder(event: Event): void {
    event.stopPropagation();
    this.params.onClick({
      index: this.params.node.id,
      side: this.params.colDef.field
    });
  }

}
