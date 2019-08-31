import { State, Store, Selector } from "@ngxs/store";


@State({
    name: 'product',
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
      return state.products.model;
    }

    @Selector()
    static orderFormDirty(state: any): any {
      return state.products.dirty;
    }

    @Selector()
    static orderFormStatus(state: any): any {
      return state.products.status;
    }

    @Selector()
    static orderFormErrors(state: any): any {
      return state.products.errors;
    }
}