export interface ICustomer {
    id?: number;
    name?: string;
    description?: string;
    champion?: string;
    note?: string;
}

export class Customer implements ICustomer {
    constructor(public id?: number, public name?: string, public description?: string, public champion?: string, public note?: string) {}
}
