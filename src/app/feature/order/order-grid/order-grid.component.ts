import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, RowNode, Column, GridReadyEvent } from 'ag-grid-community';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NumericEditorComponent } from '../numeric-editor/numeric-editor.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from '../place-order/place-order.component';
import { FormState } from 'src/app/store/order-form.state';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-order-grid',
  templateUrl: './order-grid.component.html',
  styleUrls: ['./order-grid.component.css']
})
export class OrderGridComponent implements OnInit {

  @Select(FormState.orderFormModel) orderFormModel$: Observable<any>;
  @Select(FormState.orderFormStatus) orderFormStatus$: Observable<any>;
  @Select(FormState.orderFormDirty) orderFormDirty$: Observable<any>;
  @Select(FormState.orderFormErrors) orderFormErrors$: Observable<any>;
  
  private api: GridApi;
  private columnApi: ColumnApi;

  formGroup: FormGroup = new FormGroup({});

  columnDefs = [
    { headerName: 'Order #', field: "orderNumber", width: 110, suppressSizeToFit: true },
    { headerName: 'Bid Volume', field: "bidVolume", cellRenderer: 'formCell' },
    { headerName: 'Bid Rate', field: "bidRate", cellRenderer: 'formCell' },
    { headerName: '', field: "bid", cellRenderer: 'placeOrder', 
      cellRendererParams: {
        onClick: this.placeOrder.bind(this)
      }
    },
    { headerName: '', field: "bidOrderDetails", cellRenderer: 'orderDetails' },
    { headerName: '', field: "offerOrderDetails", cellRenderer: 'orderDetails' },
    { headerName: '', field: "offer", cellRenderer: 'placeOrder', 
      cellRendererParams: {
      onClick: this.placeOrder.bind(this)
      }
    },
    { headerName: 'Offer Volume', field: "offerVolume", cellRenderer: 'formCell' },
    { headerName: 'Offer Rate', field: "offerRate", cellRenderer: 'formCell' }
  ];

  rowData = [
    { orderNumber: 1 },
    { orderNumber: 2 },
    { orderNumber: 3 },
    { orderNumber: 4 },
    { orderNumber: 5 },
  ];

  constructor( private store: Store, private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.orderFormModel$.subscribe(value => console.log('model......', value));
    this.orderFormStatus$.subscribe(value => console.log('status......', value));
    this.orderFormDirty$.subscribe(value => console.log('dirty......', value));
    this.orderFormErrors$.subscribe(value => console.log('errors......', value));
  }

  gridReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;

    // slight chicken and egg here - the grid cells will be created before the grid is ready, but we need set
    // formGroup up front as such we'll create the grid (and cells) and force refresh the cells FormCellComponent
    // will then set the form in the refresh, completing the loop  this is only necessary once, on initialisation
    this.createFormControls();
    this.api.refreshCells({ force: true });

    this.api.sizeColumnsToFit();
  }

  getRowNodeId(data: any) {
    // optional here - ag-Grid will create row ids if you don't supply one, but if you have a way of uniquely
    // identifying rows here's where you'd do it. Doing so would make it easier to pull out specific rows from the
    // form, say by order number, as we do here
    return data.orderNumber;
  }

  getComponents() {
    return {
      'formCell': NumericEditorComponent,
      'placeOrder': PlaceOrderComponent,
      'orderDetails': OrderDetailsComponent
    };
  }

  getContext() {
    return {
      formGroup: this.formGroup,
      createKey: this.createKey
    }
  }

  private createFormControls() {
    let columns = this.columnApi.getAllColumns();
    this.api.forEachNode((rowNode: RowNode) => {
      
      columns.filter(column => column.getColDef().field !== 'orderNumber')
        .forEach((column: Column) => {
          const key = this.createKey(rowNode.id, column);    // the cells will use this same createKey method
          this.formGroup.addControl(key, new FormControl())
        })
    });
  }

  private createKey(rowId: string, column: Column): string {
    return `${rowId}${column.getColId()}`;
  }

  private placeOrder(obj): void {
    console.log('Place order is clicked.', obj);
    // const volumeFieldName = obj.id + obj.side + 'Volume';
    // const rateFieldName = obj.id + obj.side + 'Rate';
    // this.formGroup.get(volumeFieldName).disable()
    // this.formGroup.get(rateFieldName).disable()
  } 

}
