
import { Component, OnInit } from '@angular/core';
import { OrderState } from 'src/app/store/order.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'order-grid-container',
    template: `
        <app-order-grid [instruments]="instruments$ | async"></app-order-grid>
    `
})

export class OrderGridContainerComponent implements OnInit {

    @Select(OrderState.orderFormModel) orderFormModel$: Observable<any>;
    @Select(OrderState.orderFormErrors) orderFormErrors$: Observable<any>;
    @Select(OrderState.instruments) instruments$: Observable<any>;

    constructor() { }

    ngOnInit() { }
}