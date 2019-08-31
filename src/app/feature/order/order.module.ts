import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';

import { OrderRoutingModule } from './order-routing.module';
import { OrderGridComponent } from './order-grid/order-grid.component';
import { NumericEditorComponent } from './renderers/numeric-editor/numeric-editor.component';
import { FormState } from 'src/app/store/order-form.state';
import { PlaceOrderComponent } from './renderers/place-order/place-order.component';
import { OrderDetailsComponent } from './renderers/order-details/order-details.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    AgGridModule.withComponents([
      NumericEditorComponent,
      PlaceOrderComponent,
      OrderDetailsComponent
    ]),
    ReactiveFormsModule,
    NgxsModule.forFeature([FormState]),
    NgxsFormPluginModule
  ],
  declarations: [OrderGridComponent, NumericEditorComponent, PlaceOrderComponent, OrderDetailsComponent]
})
export class OrderModule { }
