import { State, Store, Selector } from "@ngxs/store";


@State({
    name: 'order',
    defaults: {
      orderForm: {
        model: [],
        dirty: false,
        status: '',
        errors: {}
      }
    }
  })
export class FormState {

    constructor(private store: Store) {}

    @Selector()
    static orderFormModel(state: any): any {
      return state.orderForm.model;
    }

    @Selector()
    static orderFormDirty(state: any): any {
      return state.orderForm.dirty;
    }

    @Selector()
    static orderFormStatus(state: any): any {
      return state.orderForm.status;
    }

    @Selector()
    static orderFormErrors(state: any): any {
      return state.orderForm.errors;
    }
}