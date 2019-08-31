import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html'
})
export class PlaceOrderComponent {

  private params;

  constructor() { }

  agInit(params: any) {
    this.params = params;
  }

  placeOrder(event: Event): void {
    event.stopPropagation();
    this.params.onClick({
      id: this.params.node.id,
      side: this.params.colDef.field
    });
  }

}
