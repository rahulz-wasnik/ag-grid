import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html'
})
export class PlaceOrderComponent {

  private params;
  formGroup: FormGroup;

  constructor() { }

  agInit(params: any) {
    this.params = params;
  }

  // refresh(params: any): boolean {
  //   // this.formGroup = params.context.formGroup;
  //   return true;
  // }

  placeOrder(event: Event): void {
    event.stopPropagation();
    this.params.onClick({
      index: this.params.node.id,
      side: this.params.colDef.field
    });
  }

  // isDisabled(): boolean {
  //   if(this.params.context.formGroup) {
  //     this.formGroup = this.params.context.formGroup;
  //     const volumeFieldName = this.params.node.id + this.params.colDef.field + 'Volume';
  //     const rateFieldName = this.params.node.id + this.params.colDef.field + 'Rate';
  //     const volume = this.formGroup.get(volumeFieldName);
  //     const rate = this.formGroup.get(rateFieldName);
  //     console.log(volumeFieldName);
  //     return volume && volume.value && rate && rate.value;
  //   }
  //   return true;
  // }

}
