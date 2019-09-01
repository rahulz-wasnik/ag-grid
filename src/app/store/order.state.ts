import { State, Store, Selector, Action, StateContext } from "@ngxs/store";
import { PlaceOrder, LoadOrder } from "./order.action";
import { HttpService } from "../service/http.service";
import { patch, updateItem } from '@ngxs/store/operators';


import { tap } from 'rxjs/operators';
import { Order } from "../feature/model/order.model";



@State({
  name: 'order',
  defaults: {
    instruments: [],
    orderForm: {
      model: [],
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
export class OrderState {

  constructor(private store: Store, private httpService: HttpService) { }

  @Selector()
  static orderFormModel(state: any): any {
    return state.orderForm.model;
  }

  @Selector()
  static orderFormErrors(state: any): any {
    return state.orderForm.errors;
  }

  @Selector()
  static instruments(state: any): any {
    return state.instruments;
  }

  @Action(LoadOrder)
  loadOrder(ctx: StateContext<any>) {
    return this.httpService.load().pipe(
      tap(value => {
        value.map((item, index) => item.index = index);
        ctx.patchState({
          instruments: value
        });
      })
    )
  }

  @Action(PlaceOrder)
  placeOrder(ctx: StateContext<any>, action: PlaceOrder) {
    const orderField = action.payload.index + action.payload.side + 'Order';
    const volumeField = action.payload.index + action.payload.side + 'Volume';
    const rateField = action.payload.index + action.payload.side + 'Rate';
    let copy = { ...ctx.getState().orderForm.model };
    // If there is already a tradedVolume, use it to compute the new volume
    const tradedVolume = copy[orderField] ? parseFloat(copy[orderField].split('@')[0]) : null;
    const calculatedVolume = tradedVolume ? (parseFloat(copy[volumeField]) + tradedVolume) : copy[volumeField];
    // Order field value is volume@rate
    copy[orderField] = calculatedVolume + '@' + copy[rateField];
    ctx.patchState({
      orderForm: {
        model: copy
      }
    });
  }
}