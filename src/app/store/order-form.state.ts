import { State, Store, Selector } from "@ngxs/store";


@State({
    name: 'formAZA',
    defaults: {
      details: {
        model: [],
        dirty: false,
        status: '',
        errors: {}
      }
    }
  })
export class FormState {

    constructor(private store: Store) {}

    
}