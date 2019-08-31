import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, RowNode, Column, GridReadyEvent } from 'ag-grid-community';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NumericEditorComponent } from '../numeric-editor/numeric-editor.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-order-grid',
  templateUrl: './order-grid.component.html',
  styleUrls: ['./order-grid.component.css']
})
export class OrderGridComponent implements OnInit {

  
  private api: GridApi;
  private columnApi: ColumnApi;

  formGroup: FormGroup = new FormGroup({});

  columnDefs = [
    { headerName: 'Order #', field: "orderNumber", width: 110, suppressSizeToFit: true },
    { headerName: 'Volume', field: "volume", cellRenderer: 'formCell' },
    { headerName: 'Rate', field: "rate", cellRenderer: 'formCell' },
    { headerName: '', field: "send", cellRenderer: 'placeOrder', cellRendererParams: {
      onClick: this.placeOrder.bind(this)
    }}
  ];

  rowData = [
    { orderNumber: 1, volume: 1000, rate: 1.1 },
    { orderNumber: 2, volume: 2000, rate: 2.2 },
    { orderNumber: 3, volume: 3000, rate: 3.3 },
    { orderNumber: 4, volume: 4000, rate: 4.4 },
    { orderNumber: 5, volume: 5000, rate: 5.5 },
  ];

  constructor( private store: Store, private formBuilder: FormBuilder ) { }

  ngOnInit() {
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
      'placeOrder': PlaceOrderComponent
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

  private placeOrder(id): void {
    console.log('Place order is clicked.', id);
  } 

}
