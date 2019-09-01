
export class LoadOrder {
    static readonly type = '[Order] Load order';
    constructor() {}
}

export class PlaceOrder {
    static readonly type = '[Order] Place order';
    constructor(public payload: any) {}
}