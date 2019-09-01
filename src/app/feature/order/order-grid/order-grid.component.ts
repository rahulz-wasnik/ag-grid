import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi, RowNode, Column, GridReadyEvent, RowDataChangedEvent } from 'ag-grid-community';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PlaceOrderComponent } from '../renderers/place-order/place-order.component';
import { OrderState } from '../../../store/order.state';
import { OrderDetailsComponent } from '../renderers/order-details/order-details.component';
import { NumericEditorComponent } from '../renderers/numeric-editor/numeric-editor.component';
import { PlaceOrder, LoadOrder } from 'src/app/store/order.action';

@Component({
  selector: 'app-order-grid',
  templateUrl: './order-grid.component.html',
  styleUrls: ['./order-grid.component.css']
})
export class OrderGridComponent implements OnInit {

  @Select(OrderState.orderFormModel) orderFormModel$: Observable<any>;
  @Select(OrderState.orderFormErrors) orderFormErrors$: Observable<any>;
  @Select(OrderState.instruments) instruments$: Observable<any>;

  private api: GridApi;
  private columnApi: ColumnApi;

  formGroup: FormGroup = new FormGroup({});

  columnDefs = [
    { headerName: '', field: "index", hide: true },
    { headerName: 'Security', field: "security", width: 110, suppressSizeToFit: true },
    { headerName: 'Bid Volume', field: "bidVolume", cellRenderer: 'formCell' },
    { headerName: 'Bid Rate', field: "bidRate", cellRenderer: 'formCell' },
    {
      headerName: '', field: "bid", cellRenderer: 'placeOrder',
      cellRendererParams: {
        onClick: this.placeOrder.bind(this)
      }
    },
    { headerName: 'Order', field: "bidOrder", cellRenderer: 'orderDetails' },
    { headerName: '', field: "offerOrder", cellRenderer: 'orderDetails' },
    { headerName: '', field: "offer", cellRenderer: 'placeOrder', 
      cellRendererParams: {
      onClick: this.placeOrder.bind(this)
      }
    },
    { headerName: 'Offer Rate', field: "offerRate", cellRenderer: 'formCell' },
    { headerName: 'Offer Volume', field: "offerVolume", cellRenderer: 'formCell' }
  ];

  rowData = [
    { security: 1 },
    { security: 2 },
    { security: 3 },
    { security: 4 },
    { security: 5 }
  ];

  constructor(private store: Store, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.store.dispatch(new LoadOrder());
    this.orderFormErrors$.subscribe(value => console.log('errors.......................', value));
    this.orderFormModel$.subscribe(value => console.log('value................', value));
  }

  gridReady(params: GridReadyEvent) {
    
  }

  onRowDataChange(event: RowDataChangedEvent) {
    this.api = event.api;
    this.columnApi = event.columnApi;

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
    return data.index;
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
      suppressColumnMoveAnimation: true,
      suppressMovableColumns: true,
      formGroup: this.formGroup,
      createKey: this.createKey
    }
  }

  private createFormControls() {
    let columns = this.columnApi.getAllColumns();
    this.api.forEachNode((rowNode: RowNode) => {
      // console.log('rowNode................', rowNode);
      columns.filter(column => column.getColDef().field !== 'security')
        .forEach((column: Column) => {
          const key = this.createKey(rowNode.id, column);
          // console.log('column................', key);
          if(column.getColId() === 'bidVolume') {
            this.formGroup.addControl(key, new FormControl(null, Validators.min(rowNode.data.minVol)))
          } else {
            this.formGroup.addControl(key, new FormControl())
          }
          column.getColDef().editable = false;
        });
    });
  }

  private createKey(rowId: string, column: Column): string {
    return `${rowId}${column.getColId()}`;
  }

  private placeOrder(obj: any): void {
    this.store.dispatch(new PlaceOrder(obj));
    // this.onOrderSuccess(obj);
  }

  private onOrderSuccess(obj: any): void {
    const otherSide = obj.side === 'offer' ? 'bid' : 'offer';
    const volumeFieldName = obj.index + otherSide + 'Volume';
    const rateFieldName = obj.index + otherSide + 'Rate';
    this.formGroup.get(volumeFieldName).reset();
    this.formGroup.get(rateFieldName).reset();
    this.formGroup.get(volumeFieldName).disable();
    this.formGroup.get(rateFieldName).disable();
  }


}
